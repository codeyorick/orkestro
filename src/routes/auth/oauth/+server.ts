import { redirect, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ url, locals }) => {
	if (url.searchParams.get('error')) {
		const searchParams = new URLSearchParams(url.searchParams);
		throw redirect(303, `/auth/error?${searchParams.toString()}`);
	}

	const code = url.searchParams.get('code');

	if (!code) {
		throw redirect(303, `/auth/error?error=no-code`);
	}

	const { error } = await locals.supabase.auth.exchangeCodeForSession(code);
	if (error) {
		throw redirect(303, `/auth/error?error=exchange-failed`);
	}

	throw redirect(303, `/`);
};