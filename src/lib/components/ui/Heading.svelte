<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import type { Snippet } from 'svelte';

	interface Props extends HTMLAttributes<HTMLHeadingElement> {
		children: Snippet;
		level: string | number;
	}

	let { children, level, class: classes, ...rest }: Props = $props();

	if (typeof(level) !== 'number') {
		level = parseInt(level);
	}
</script>

{#if level === 1}
	<h1 class={['font-medium font-heading text-4xl', classes]} {...rest}>{@render children()}</h1>
{:else if level === 2}
	<h2 class={['font-medium font-heading text-3xl', classes]} {...rest}>{@render children()}</h2>
{:else if level === 3}
	<h3 class={['font-medium font-heading text-2xl', classes]} {...rest}>{@render children()}</h3>
{:else if level === 4}
	<h4 class={['font-medium font-heading text-xl', classes]} {...rest}>{@render children()}</h4>
{:else if level === 5}
	<h5 class={['font-medium font-heading text-lg', classes]} {...rest}>{@render children()}</h5>
{:else if level === 6}
	<h6 class={['font-medium font-heading', classes]} {...rest}>{@render children()}</h6>
{/if}