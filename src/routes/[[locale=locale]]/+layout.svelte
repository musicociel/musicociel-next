<script lang="ts">
	import { asset } from '$app/paths';
	import { page } from '$app/state';
	import FaIcon from '$lib/FaIcon.svelte';
	import NavBar from '$lib/NavBar.svelte';
	import { m } from '$lib/paraglide/messages';
	import { deLocalizeHref, locales, localizeHref } from '$lib/paraglide/runtime';
	import { hostAbsolute } from '$lib/url';
	import { faLanguage } from '@fortawesome/free-solid-svg-icons';
	import { onMount } from 'svelte';
	import { registerSW } from 'virtual:pwa-register';
	import '../../app.css';

	let { params, children } = $props();

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

{#if params.locale}
	<NavBar>
		<img class="me-2 w-12" src={asset('/favicon.svg')} alt="Logo" />
		<span class="text-xl">Musicociel</span>
		<div class="dropdown dropdown-end ms-auto">
			<button type="button" class="btn m-1"><FaIcon icon={faLanguage} /></button>
			<ul class="dropdown-content menu z-1 w-52 rounded-box bg-base-100 p-2 shadow-sm">
				{#each locales as locale (locale)}
					<li><a data-sveltekit-reload href={localizeHref(hostAbsolute(page.url), { locale })}>{m.language({}, { locale })}</a></li>
				{/each}
			</ul>
		</div>
	</NavBar>

	<div class="absolute top-0 flex min-h-dvh w-full flex-col">
		<div class="h-16"></div>
		{@render children?.()}
	</div>
{/if}
