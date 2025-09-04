<script lang="ts">
	import { asset, resolve } from '$app/paths';
	import { page } from '$app/state';
	import FaIcon from '$lib/FaIcon.svelte';
	import NavBar from '$lib/NavBar.svelte';
	import { m } from '$lib/paraglide/messages';
	import { locales, localizeHref } from '$lib/paraglide/runtime';
	import { hostAbsolute } from '$lib/url';
	import { faLanguage } from '@fortawesome/free-solid-svg-icons';

	let { params, children } = $props();
</script>

{#key params.locale}
	{#if params.locale}
		<NavBar>
			<a class="flex items-center" href={resolve('/[[locale=locale]]', { locale: params.locale })}>
				<img class="me-2 w-12" src={asset('/favicon.svg')} alt="Logo" />
				<span class="text-xl">Musicociel</span>
			</a>
			<div class="dropdown dropdown-end ms-auto">
				<button type="button" class="btn m-1"><FaIcon icon={faLanguage} /></button>
				<ul class="dropdown-content menu z-1 w-52 rounded-box bg-base-100 p-2 shadow-sm">
					{#each locales as locale (locale)}
						<li><a href={localizeHref(hostAbsolute(page.url), { locale })}>{m.language({}, { locale })}</a></li>
					{/each}
				</ul>
			</div>
		</NavBar>

		<div class="absolute top-0 flex min-h-dvh w-full flex-col">
			<div class="h-16"></div>
			{@render children?.()}
		</div>
	{/if}
{/key}
