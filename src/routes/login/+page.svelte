<script lang="ts">
	import { enhance } from '$app/forms';
	import { Button, Fieldset, Input } from '$lib/components/ui';
	import { OAuthProvider } from 'appwrite';
</script>

<div class="flex flex-col items-stretch gap-4 max-w-xs mx-auto">
	<form action="?/login" method="POST" use:enhance class="flex flex-col items-stretch gap-2">
		<Fieldset legend="Inloggen">
			<Input type="email" name="email" label="E-mailadres" />
			<Input type="password" name="password" label="Wachtwoord" />
		</Fieldset>
		<Button type="submit">Login</Button>
	</form>
	<div class="divider">of</div>
	<form action="?/oauth" method="POST" use:enhance>
		<input type="hidden" name="provider" value={OAuthProvider.Github}>
		<Button type="submit">Login met GitHub</Button>
	</form>
	<form action="?/oauth" method="POST" use:enhance>
		<input type="hidden" name="provider" value={OAuthProvider.Google}>
		<Button type="submit">Login met Google</Button>
	</form>
</div>
