import type { Actions } from "./$types";
import { error, redirect } from "@sveltejs/kit";
import { AppwriteException } from "appwrite";
import { COOKIE } from "$lib/constants";

export const actions: Actions = {
  default: async ({ request, locals, cookies }) => {
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
    } catch (err) {
      error(400, (err as AppwriteException).message)
    }

    redirect(301, "/")
  }
}