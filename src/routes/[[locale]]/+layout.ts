import { browser } from '$app/environment';
import { getLocale, localizeUrl } from '$lib/paraglide/runtime';

export const load = async ({ params, url }) => {
	if (browser && params.locale !== getLocale()) {
		const withLocale = localizeUrl(url);
		// avoid reload loops for URLs which don't exist:
		if (url.href !== withLocale.href) {
			location.replace(withLocale);
			await new Promise(() => {}); // avoid rendering while redirecting
		}
	}
};
