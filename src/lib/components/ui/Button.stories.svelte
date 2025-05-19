<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Button from '$lib/components/ui/Button.svelte';
	import { fn } from '@storybook/test';

	const { Story } = defineMeta({
		title: 'UI/Button',
		component: Button,
		tags: ['autodocs'],
		args: {
			children: 'Click me',
			onclick: fn()
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
	<Button {...args}>{args.children}</Button>
{/snippet}

<Story name="Default" />
<Story name="Primary" args={{ class: 'btn-primary' }} />
<Story name="Secondary" args={{ class: 'btn-secondary' }} />
<Story name="Accent" args={{ class: 'btn-accent' }} />
<Story name="Info" args={{ class: 'btn-info' }} />
<Story name="Success" args={{ class: 'btn-success' }} />
<Story name="Warning" args={{ class: 'btn-warning' }} />
<Story name="Error" args={{ class: 'btn-error' }} />
