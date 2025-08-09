import { form, getRequestEvent } from '$app/server';
import { redirect } from '@sveltejs/kit';
import { isValidProvider } from '$lib/utils/auth';

export const login = form(async data => {
	const { locals } = getRequestEvent()

	const email = data.get('email') as string;

	if (!/^[\w-.+]+@([\w-]+\.)+[\w-]{2,8}$/.test(email)) {
		return { error: 'Ongeldig e-mailadres' };
	}
	const password = data.get('password') as string;

	const { error } = await locals.supabase.auth.signInWithPassword({ email, password });

	if (error) {
		return { error: `Ongeldige gebruikersnaam en/of wachtwoord` };
	}

	redirect(303, '/');
})

export const oauth = form(async data => {
	const { locals, url: { origin } } = getRequestEvent()

	const provider = data.get('provider') as string | null;

	if (provider && isValidProvider(provider)) {
		const {
			data: { url },
			error
		} = await locals.supabase.auth.signInWithOAuth({
			provider,
			options: { redirectTo: `${origin}/auth/oauth` }
		})

		if (error) {
			return { error: error.message };
		}
		if (!url) {
			return { error: 'Fault during OAuth login. Please contact support.' };
		}

		redirect(303, url);
	} else {
		return { error: 'Invalid provider' };
	}
})