<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Link from '$lib/components/ui/Link.svelte';

	const { Story } = defineMeta({
		title: 'UI/Link',
		component: Link,
		tags: ['autodocs'],
		args: {
			children: 'Click me',
			href: '#'
		},
		argTypes: {
			children: {
				control: { type: 'text' }
			}
		},
		render: template
	});
</script>

{#snippet template(args)}
	<Link {...args}>{args.children}</Link>
{/snippet}

<Story name="Default" />
<Story name="Button" args={{ class: 'btn-default' }} />
