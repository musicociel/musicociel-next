<script lang="ts">
	import { page } from '$app/state';
	import { deLocalizeHref, locales, localizeHref } from '$lib/paraglide/runtime';
	import { hostAbsolute } from '$lib/url';
	import { onMount } from 'svelte';
	import { registerSW } from 'virtual:pwa-register';
	import '../app.css';

	const { children } = $props();

	onMount(() => {
		registerSW();
	});
</script>

<svelte:head>
	{#each locales as locale (locale)}
		<link rel="alternate" href={localizeHref(hostAbsolute(page.url), { locale })} hreflang={locale} />
	{/each}
	<link rel="alternate" href={deLocalizeHref(hostAbsolute(page.url))} hreflang="x-default" />
</svelte:head>

{@render children?.()}
