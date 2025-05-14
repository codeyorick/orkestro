<script lang="ts">
	import type { HTMLButtonAttributes } from "svelte/elements";

	let { children, ...rest }: HTMLButtonAttributes = $props();
</script>

<button aria-label="button" {...rest} class={['btn', rest.class]}>
	{@render children?.()}
</button>
