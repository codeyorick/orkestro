<script lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';

	let { files = $bindable(), multiple, ...rest }: HTMLInputAttributes = $props();

	function dropHandler(event: DragEvent) {
		event.preventDefault();
		(event.target as HTMLElement).classList.remove('bg-base-300');

		if (multiple) {
			files = event.dataTransfer?.files;
		} else if (event.dataTransfer?.files?.length) {
			const dt = new DataTransfer();
			dt.items.add(event.dataTransfer.files[event.dataTransfer.files.length - 1]);
			files = dt.files;
		}
	}

	function dragoverHandler(event: Event) {
		event.preventDefault();
		(event.target as HTMLElement).classList.add('bg-base-300');
	}

	function dragleaveHandler(event: Event) {
		event.preventDefault();
		(event.target as HTMLElement).classList.remove('bg-base-300');
	}
</script>

<label
	ondrop={dropHandler}
	ondragover={dragoverHandler}
	ondragleave={dragleaveHandler}
	class="flex flex-col
	border border-[var(--btn-border)] border-dashed
	rounded-[var(--radius-field)]
	items-center justify-center
	w-full p-6 min-h-48
	cursor-pointer text-base"
>
	<span>Sleep bestanden hierheen</span>
	<span class="divider w-48 mx-auto">of</span>
	<input bind:files type="file" class="file-input" {multiple} {...rest} />
	{#if files && multiple}
		<div class="list mt-6">
			{#each files as file (file)}
				<div class="list-row text-center">
					{file.name}
				</div>
			{/each}
		</div>
	{/if}
</label>
