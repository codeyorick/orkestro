<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Fieldset from '$lib/components/ui/Fieldset.svelte';
	import Input from '$lib/components/ui/Input.svelte';

	const { Story } = defineMeta({
		title: 'UI/Fieldset',
		component: Fieldset,
		tags: ['autodocs'],
		args: {
			legend: 'Legend',
			label: 'And here I give more explanation'
		},
		render: template
	});
</script>

{#snippet template(args)}
	<Fieldset {...args}>
		<Input placeholder="Input field" />
	</Fieldset>
{/snippet}

{#snippet multipleTemplate(args)}
	<Fieldset {...args}>
		<Input label="Username" />
		<Input label="Password" type="password" />
	</Fieldset>
{/snippet}

<Story name="Default" />
<Story name="Multiple fields" template={multipleTemplate} />
