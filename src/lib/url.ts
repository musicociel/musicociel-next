import { building } from '$app/environment';

export const hostAbsolute = building ? (url: URL) => url.pathname : (url: URL) => `${url.pathname}${url.search}${url.hash}`;
