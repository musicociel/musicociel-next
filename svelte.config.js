import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: vitePreprocess(),
	kit: {
		env: {
			publicPrefix: 'MUSICOCIEL_PUBLIC_'
		},
		adapter: adapter({
			fallback: '404.html'
		}),
		paths: {
			base: process.env.BASE_PATH ?? '' // must be the same as in vite.config.ts
		}
	}
};

export default config;
