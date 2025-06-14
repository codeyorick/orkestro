<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import type { Snippet } from 'svelte';

	interface Props extends HTMLAttributes<HTMLHeadingElement> {
		children: Snippet;
		level: string | number;
	}

	let { children, level, ...rest }: Props = $props();

	if (typeof(level) !== 'number') {
		level = parseInt(level);
	}
</script>

{#if level === 1}
	<h1 class={['font-bold text-4xl', rest.class]} {...rest}>{@render children()}</h1>
{:else if level === 2}
	<h2 class={['font-bold text-3xl', rest.class]} {...rest}>{@render children()}</h2>
{:else if level === 3}
	<h3 class={['font-bold text-2xl', rest.class]} {...rest}>{@render children()}</h3>
{:else if level === 4}
	<h4 class={['font-bold text-xl', rest.class]} {...rest}>{@render children()}</h4>
{:else if level === 5}
	<h5 class={['font-bold text-lg', rest.class]} {...rest}>{@render children()}</h5>
{:else if level === 6}
	<h6 class={['font-bold', rest.class]} {...rest}>{@render children()}</h6>
{/if}