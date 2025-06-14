<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Heading from '$lib/components/ui/Heading.svelte';

	const { Story } = defineMeta({
		title: 'UI/Heading',
		component: Heading,
		tags: ['autodocs'],
		args: {
			children: 'This is a heading',
			level: 1
		},
		argTypes: {
			children: {
				control: { type: 'text' }
			},
			level: {
				control: { type: 'number', min: 1, max: 6, step: 1 }
			}
		},
		render: template
	});
</script>

{#snippet template(args)}
	<Heading {...args}>{args.children}</Heading>
{/snippet}

<Story name="Heading 1" args={{ level: 1 }} />
<Story name="Heading 2" args={{ level: 2 }} />
<Story name="Heading 3" args={{ level: 3 }} />
<Story name="Heading 4" args={{ level: 4 }} />
<Story name="Heading 5" args={{ level: 5 }} />
<Story name="Heading 6" args={{ level: 6 }} />
