<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Header from '$lib/components/layout/Header.svelte';

	const { Story } = defineMeta({
		title: 'Layout/Header',
		component: Header,
		tags: ['autodocs']
	});
</script>

<Story name="Default" />
