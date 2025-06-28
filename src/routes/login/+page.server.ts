import type { Actions } from "./$types";
import { fail, redirect } from "@sveltejs/kit";
import type { Provider } from '@supabase/supabase-js';


export const actions: Actions = {
	login: async ({ request, locals }) => {
		const formData = await request.formData();
		const email = formData.get('email') as string;

		if (!/^[\w-.+]+@([\w-]+\.)+[\w-]{2,8}$/.test(email)) {
			return fail(422, { error: 'Please enter a valid email address' });
		}
		const password = formData.get('password') as string;

		const { error } = await locals.supabase.auth.signInWithPassword({ email, password });

		if (error) {
			return fail(422, {
				error: `Invalid credentials.`
			});
		}

		redirect(302, '/');
	},
	oauth: async ({ request, locals, url: { origin } }) => {
		const formData = await request.formData();
		const provider = formData.get('provider') as Provider | null;

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

			redirect(302, url);
		} else {
			return fail(400, { message: 'Invalid provider' });
		}
	}
};