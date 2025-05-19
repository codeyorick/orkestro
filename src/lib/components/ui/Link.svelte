<script lang="ts">
	import type { HTMLAnchorAttributes } from 'svelte/elements';

	let { children, ...rest }: HTMLAnchorAttributes = $props();
</script>

<a {...rest} class={['btn', rest.class ?? 'btn-link']}>
	{@render children?.()}
</a>
