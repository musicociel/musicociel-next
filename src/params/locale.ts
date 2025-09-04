import type { ParamMatcher } from '@sveltejs/kit';
import { isLocale } from '$lib/paraglide/runtime.js';

export const match = isLocale satisfies ParamMatcher;
