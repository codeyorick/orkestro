<script lang="ts">
	import '../app.css';
	import { Header, Footer } from '$lib/components/layout';
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';

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

<div class="flex flex-col min-h-screen">
	<Header />
	<main class="p-4 flex-grow">
		{@render children()}
	</main>
	<Footer />
</div>
