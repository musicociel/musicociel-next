import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { SvelteKitPWA } from '@vite-pwa/sveltekit';

const base = (process.env.BASE_PATH ?? '') + '/'; // must be the same as in svelte.config.js

export default defineConfig({
	plugins: [
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
			kit: {
				spa: true
			},
			manifest: {
				name: 'Musicociel',
				short_name: 'Musicociel',
				theme_color: '#ffffff',
				background_color: '#ffffff',
				display: 'standalone'
			}
		})
	]
});
