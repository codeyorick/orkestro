<script lang="ts">
	import type { HTMLFieldsetAttributes } from 'svelte/elements';
	import type { Snippet } from 'svelte';

	interface Props extends HTMLFieldsetAttributes {
		children: Snippet;
		legend?: string;
		label?: string;
	}

	let { children, legend, label, ...rest }: Props = $props();
</script>

<fieldset {...rest} class={['fieldset', rest.class]}>
	{#if legend}
		<legend class="fieldset-legend">{legend}</legend>
	{/if}
	{@render children()}
	{#if label}
		<p class="fieldset-label">{label}</p>
	{/if}
</fieldset>
