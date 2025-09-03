import type { Handle } from '@sveltejs/kit';
import { paraglideMiddleware } from '$lib/paraglide/server';
import { pwaAssetsHead } from 'virtual:pwa-assets/head';
import { pwaInfo } from 'virtual:pwa-info';

const handleParaglide: Handle = ({ event, resolve }) =>
	paraglideMiddleware(event.request, ({ request, locale }) => {
		event.request = request;

		return resolve(event, {
			transformPageChunk: ({ html }) => {
				let pwaHeader = '';
				if (pwaInfo) {
					pwaHeader += `\n\t\t${pwaInfo.webManifest.linkTag}`;
				}
				if (pwaAssetsHead.themeColor) {
					pwaHeader += `\n\t\t<meta name="theme-color" content=${pwaAssetsHead.themeColor.content} />`;
				}
				for (const link of pwaAssetsHead.links) {
					pwaHeader += `\n\t\t<link`;
					for (const prop of Object.keys(link) as (string & keyof typeof link)[]) {
						const value = link[prop];
						if (value) {
							pwaHeader += ` ${prop}="${value}"`;
						}
					}
					pwaHeader += `/>`;
				}
				return html.replace('%paraglide.lang%', locale).replace('%pwa.head%', pwaHeader);
			}
		});
	});

export const handle: Handle = handleParaglide;
