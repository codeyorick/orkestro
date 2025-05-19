<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Input from '$lib/components/ui/Input.svelte';
	import Fieldset from '$lib/components/ui/Fieldset.svelte';

	const { Story } = defineMeta({
		title: 'UI/Input',
		component: Input,
		tags: ['autodocs'],
		render: template
	});
</script>

{#snippet template(args)}
	<Fieldset>
		<Input {...args}>{args.children}</Input>
	</Fieldset>
{/snippet}

<Story name="Default" />
<Story name="With label" args={{ label: 'Username' }} />
