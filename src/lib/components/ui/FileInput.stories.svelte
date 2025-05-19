<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import FileInput from '$lib/components/ui/FileInput.svelte';
	import Fieldset from '$lib/components/ui/Fieldset.svelte';

	const { Story } = defineMeta({
		title: 'UI/FileInput',
		component: FileInput,
		tags: ['autodocs'],
		render: template
	});
</script>

{#snippet template(args)}
	<Fieldset>
		<FileInput {...args} />
	</Fieldset>
{/snippet}

<Story name="Default" />
<Story name="Multiple" args={{ multiple: true }} />
