<script lang="ts">
	import type { HTMLButtonAttributes } from 'svelte/elements';

	interface Props extends HTMLButtonAttributes {
		loading?: boolean;
	}

	let { children, loading = $bindable(), ...rest }: Props = $props();
</script>


<button aria-label="button" {...rest} class={['btn', rest.class]}>
	{#if loading}
		<div class="loading loading-spinner"></div>
	{:else}
		{@render children?.()}
	{/if}
</button>
