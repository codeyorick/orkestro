<script lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';

	interface Props extends HTMLInputAttributes {
		label?: string;
	}

	let { label, ...rest }: Props = $props();

	const uid = $props.id();
</script>

{#if label}
	<label class="label" for={uid}>{label}</label>
	<input {...rest} id={uid} placeholder={rest.placeholder ?? label} class={['input', rest.class]} />
{:else}
	<input {...rest} class={['input', rest.class]} />
{/if}
