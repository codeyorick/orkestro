import type { LayoutServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load: LayoutServerLoad = async ({ cookies, locals: { safeGetSession }, url }) => {
	const { session, user } = await safeGetSession();

	if (user) {
		if (url.pathname === '/login') redirect(302, '/');
	} else {
		if (url.pathname !== '/login') redirect(302, '/login');
	}

	return {
		session,
		user,
		cookies: cookies.getAll()
	};
};