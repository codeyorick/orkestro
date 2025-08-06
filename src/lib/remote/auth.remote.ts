import { form, getRequestEvent } from '$app/server';
import { fail, redirect } from '@sveltejs/kit';
import type { Provider } from '@supabase/supabase-js';

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

	const provider = data.get('provider') as Provider | null;

	if (provider) {
		const {
			data: { url }
		} = await locals.supabase.auth.signInWithOAuth({
			provider,
			options: { redirectTo: `${origin}/auth/oauth` }
		});

		if (!url) {
			return fail(400, { message: 'Fault during OAuth login. Please contact support.' });
		}

		redirect(303, url);
	} else {
		return fail(400, { message: 'Invalid provider' });
	}
})