<script lang="ts">
	import '../app.css';
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';
	import { ModeWatcher } from 'mode-watcher';

	let { data, children } = $props();
	let { session, supabase } = $derived(data);

	onMount(() => {
		const { data } = supabase.auth.onAuthStateChange((_, newSession) => {
			if (newSession?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth');
			}
		})

		return () => data.subscription.unsubscribe();
	})
</script>

<svelte:boundary>
	<ModeWatcher/>
	{#snippet pending()}
		<div class="h-full flex items-center justify-center">
			<span class="loading loading-spinner loading-xl"></span>
		</div>
	{/snippet}

	<main class="overflow-y-auto h-full">
		{@render children()}
	</main>
</svelte:boundary>