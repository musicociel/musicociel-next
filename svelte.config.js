import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: [
		vitePreprocess(),
		{
			// SvelteKit automatically adds a live announcer div with inline CSS which breaks the CSP
			// "position: absolute; left: 0; top: 0; clip: rect(0 0 0 0); clip-path: inset(50%); overflow: hidden; white-space: nowrap; width: 1px; height: 1px"
			// Let's use tailwind styles instead, as suggested here; https://github.com/sveltejs/kit/issues/12661#issuecomment-2679678303
			name: 'announcer-styles-to-tailwind',
			markup: ({ content: code }) => {
				code = code.replace(
					/(<div id="svelte-announcer"[^>]*?)\s+style="[^"]*"/,
					'$1 class="absolute left-0 top-0 [clip:rect(0,0,0,0)] [clip-path:inset(50%)] overflow-hidden whitespace-nowrap w-px h-px"'
				);
				return { code };
			}
		}
	],
	kit: {
		csp: {
			directives: {
				'default-src': ['self']
			}
		},
		env: {
			publicPrefix: 'MUSICOCIEL_PUBLIC_'
		},
		adapter: adapter({
			fallback: '404.html'
		}),
		paths: {
			relative: false,
			base: process.env.BASE_PATH ?? '' // must be the same as in vite.config.ts
		}
	}
};

export default config;
