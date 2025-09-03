import { locales } from '$lib/paraglide/runtime.js';
export const entries = () => {
	return locales.map((locale) => ({ locale }));
};
