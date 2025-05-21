import { redirect, type RequestHandler } from '@sveltejs/kit';
import { COOKIE } from '$lib/constants';

export const GET: RequestHandler = async ({ url, locals, cookies }) => {
	const userId = url.searchParams.get("userId");
	const secret = url.searchParams.get("secret");

	if (!userId || !secret) {
		return new Response("Missing `userId` or `secret` query parameters", {
			status: 400
		})
	}

	const session = await locals.admin.createSession(userId, secret);

	cookies.set(COOKIE.APPWRITE, session.secret, {
		sameSite: "strict",
		expires: new Date(session.expire),
		secure: true,
		path: "/"
	})

	redirect(302, "/")
}