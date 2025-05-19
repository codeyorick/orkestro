<script lang="ts">
	import { enhance } from '$app/forms';
	import { Button, Fieldset, Input } from '$lib/components/ui';
	import { PUBLIC_APPWRITE_ENDPOINT, PUBLIC_APPWRITE_PROJECT } from '$env/static/public';

	import { Client, Account, OAuthProvider } from 'appwrite';

	const client = new Client()
		.setEndpoint(PUBLIC_APPWRITE_ENDPOINT)
		.setProject(PUBLIC_APPWRITE_PROJECT);

	function oauth(provider: OAuthProvider) {
		const account = new Account(client);
		account.createOAuth2Session(provider);
	}
</script>

<div class="flex flex-col items-stretch gap-4 max-w-xs mx-auto">
	<form method="POST" use:enhance class="flex flex-col items-stretch gap-2">
		<Fieldset legend="Inloggen">
			<Input type="email" name="email" label="E-mailadres" />
			<Input type="password" name="password" label="Wachtwoord" />
		</Fieldset>
		<Button type="submit">Login</Button>
	</form>
	<div class="divider">of</div>
	<Button onclick={() => oauth(OAuthProvider.Github)}>Login met GitHub</Button>
</div>
