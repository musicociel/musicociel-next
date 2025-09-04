import { browser } from '$app/environment';
import { localizeUrl } from '$lib/paraglide/runtime';
import { redirect } from '@sveltejs/kit';

export const load = async ({ params, url }) => {
	if (browser && !params.locale) {
		redirect(302, localizeUrl(url));
	}
};
