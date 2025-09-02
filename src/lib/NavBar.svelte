<script lang="ts">
	import type { Snippet } from 'svelte';

	const { children }: { children?: Snippet } = $props();

	let y = $state(0);
</script>

<svelte:window bind:scrollY={y} />
<div class="fixed top-0 z-10 navbar bg-base-100 opacity-90" class:shadow-2xl={y !== 0}>
	{@render children?.()}
</div>
