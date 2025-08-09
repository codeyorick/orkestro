<script lang="ts">
	import { Button, Heading, Input } from '$lib/components/ui';
	import { login, oauth } from '$lib/remote/auth.remote';
	import type { Provider } from '@supabase/supabase-js';

	let loading = $state(false);
	let loadingOauth: { [key in Provider]: boolean } = $state({});
</script>

{#snippet oauthForm(provider: Provider, label: string)}
	{@const form = oauth.for(provider)}
	<form {...form} onsubmit={() => loadingOauth[provider] = true}>
		<input type="hidden" name="provider" value={provider}>
		<Button type="submit" class="w-full mb-4" bind:loading={loadingOauth[provider]}>Inloggen met {label}</Button>
	</form>
	{#if form.result}
		<div class="alert alert-soft alert-error mt-2">
			{form.result.error}
		</div>
	{/if}
{/snippet}

<div class="flex flex-grow items-center bg-base-300">
	<div class="card mx-auto max-w-4xl shadow-md md:my-4">
		<div class="grid md:grid-cols-2 grid-cols-1 bg-base-200 md:rounded-lg">

			<div class="py-20 px-16 relative">
				<img src="/logo.svg" alt="Orkestro logo" class="mx-auto h-32 mb-4" />
				<Heading level="1" class="text-primary text-center">ORKESTRO</Heading>
				<p class="text-center mt-2 font-medium">Beheer eenvoudig de muziek binnen je muziekvereniging.</p>
				<div class="hidden md:block absolute bottom-0 left-0 w-full">
					<div class="max-w-xs mx-auto text-center text-xs text-base-content/50 pb-4">
						Copyright © {new Date().getFullYear()} Yorick Nap en Niels Krijnen
						<br />
						Alle rechten voorbehouden
					</div>
				</div>
			</div>

			<div class="py-20 px-16 bg-base-100 md:rounded-r-lg border-l border-base-300">
				<Heading level="2" class="text-center mb-6">Inloggen</Heading>
				<form {...login.enhance(async ({ submit }) => {
					loading = true
					await submit()
					loading = false
				})}>
					<Input type="email" name="email" label="E-mailadres" required class="w-full" />
					<Input type="password" name="password" label="Wachtwoord" required class="w-full" />
					{#if login.result}
						<div class="alert alert-soft alert-error mt-2">
							{login.result.error}
						</div>
					{/if}
					<Button type="submit" class="w-full mt-4 btn-primary" bind:loading>Inloggen</Button>
				</form>
				<div class="divider my-8">of</div>
				{@render oauthForm("github", "GitHub")}
				{@render oauthForm("google", "Google")}
			</div>

			<div class="md:hidden max-w-xs mx-auto text-center text-xs text-base-content/50 p-4">
				Copyright © {new Date().getFullYear()} Yorick Nap en Niels Krijnen
				<br />
				Alle rechten voorbehouden
			</div>

		</div>
	</div>
</div>
