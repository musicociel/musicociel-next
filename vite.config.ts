import { paraglideVitePlugin } from '@inlang/paraglide-js';
import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import { SvelteKitPWA } from '@vite-pwa/sveltekit';
import { defineConfig, loadEnv, type PluginOption } from 'vite';
import { locales, baseLocale } from './project.inlang/settings.json';

const base = (process.env.BASE_PATH ?? '') + '/'; // must be the same as in svelte.config.js
const emitClientAsset = (fileName: string, source: string | Uint8Array): PluginOption => ({
	name: 'emitClientAsset',
	buildStart() {
		if (this.environment.config.consumer === 'client') {
			this.emitFile({ fileName, type: 'asset', source });
		}
	}
});

export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd(), '');
	const msClientId = env.MUSICOCIEL_PUBLIC_MICROSOFT_CLIENTID;
	return {
		plugins: [
			msClientId
				? emitClientAsset(
						'.well-known/microsoft-identity-association.json',
						JSON.stringify({ associatedApplications: [{ applicationId: msClientId }] })
					)
				: null,
			tailwindcss(),
			sveltekit(),
			SvelteKitPWA({
				injectRegister: false,
				registerType: 'autoUpdate',
				pwaAssets: {
					image: 'static/favicon.svg'
				},
				base: base,
				scope: base,
				kit: { spa: true, adapterFallback: '404.html', trailingSlash: 'always' },
				manifest: {
					lang: baseLocale,
					name: 'Musicociel',
					short_name: 'Musicociel',
					theme_color: '#ffffff',
					background_color: '#ffffff',
					display: 'standalone'
				}
			}),
			paraglideVitePlugin({
				project: './project.inlang',
				outdir: './src/lib/paraglide',
				strategy: ['url', 'preferredLanguage', 'baseLocale'],
				urlPatterns: [
					{
						pattern: `${base}:path(.*)?`,
						localized: locales.map((locale) => [locale, `${base}${locale}/:path(.*)?`])
					}
				]
			})
		]
	};
});
