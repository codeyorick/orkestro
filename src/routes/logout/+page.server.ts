import type { PageServerLoad } from "./$types";
import { redirect } from "@sveltejs/kit";
import { COOKIE } from "$lib/constants";

export const load: PageServerLoad = async ({ locals, cookies }) => {
  await locals.aw.logout()
  cookies.delete(COOKIE.APPWRITE, { path: "/" })
  redirect(301, "/login")
}