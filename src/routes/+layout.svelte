<script lang="ts">
	import { asset } from '$app/paths';
	import { onMount } from 'svelte';
	import { pwaAssetsHead } from 'virtual:pwa-assets/head';
	import { pwaInfo } from 'virtual:pwa-info';
	import { registerSW } from 'virtual:pwa-register';
	import NavBar from '$lib/NavBar.svelte';
	import '../app.css';

	let { children } = $props();

	onMount(() => {
		registerSW();
	});
</script>

<svelte:head>
	{#if pwaAssetsHead.themeColor}
		<meta name="theme-color" content={pwaAssetsHead.themeColor.content} />
	{/if}
	{#each pwaAssetsHead.links as link (link.href)}
		<link {...link} />
	{/each}
	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	{@html pwaInfo?.webManifest.linkTag ?? ''}
</svelte:head>

<NavBar><img class="me-2 w-12" src={asset('/favicon.svg')} alt="Logo" /> <span class="text-xl">Musicociel</span></NavBar>

<div class="absolute top-0 flex min-h-dvh w-full flex-col">
	<div class="h-16"></div>
	{@render children?.()}
</div>
