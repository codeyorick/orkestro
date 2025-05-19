<script lang="ts">
	import '../app.css';
	import { Header, Footer } from '$lib/components/layout';

	let { children } = $props();
</script>

<div class="flex flex-col min-h-screen">
	<Header />
	<main class="p-4 flex-grow">
		{@render children()}
	</main>
	<Footer />
</div>
