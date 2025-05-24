import type { Actions } from "./$types";
import { fail, redirect } from "@sveltejs/kit";
import { OAuthProvider } from 'appwrite';
import { COOKIE } from "$lib/constants";

export const actions: Actions = {
  login: async ({ request, locals, cookies }) => {
    const formData = await request.formData()
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    try {
      const session = await locals.admin.login(email, password)

      cookies.set(COOKIE.APPWRITE, session.secret, {
        sameSite: "strict",
        path: "/",
        expires: new Date(session.expire),
        secure: true,
        httpOnly: false
      })
    } catch (error) {
      return fail(400, { error });
    }

    redirect(302, "/")
  },
	oauth: async ({ request, locals, url }) => {
		const formData = await request.formData()
		const provider = formData.get("provider") as string | null

		if (provider) {
			const redirectUrl = await locals.admin.oauth(provider as OAuthProvider, {
				success: `${url.origin}/auth/oauth`,
				failure: `${url.origin}/login`
			})

			redirect(302, redirectUrl)
		} else {
			return fail(400, { message: "Invalid provider" })
		}
	}
}