<script lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';

	interface Props extends HTMLInputAttributes {
		label?: string;
		containerClass?: string;
		value?: string;
	}

	let { label, containerClass, value = $bindable(), ...rest }: Props = $props();
</script>

<fieldset class={['fieldset', containerClass]}>
	{#if label}
		<legend class="fieldset-legend text-sm">{label}</legend>
	{/if}
	<input {...rest} placeholder={rest.placeholder ?? label} class={['input', rest.class]} bind:value />
</fieldset>
