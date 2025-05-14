import type { LayoutServerLoad } from "./$types";
import { redirect } from "@sveltejs/kit";

export const load: LayoutServerLoad = async ({ cookies, locals, url }) => {
  const user = await locals.aw.getUser()

  if (user) {
    if (url.pathname === "/login") redirect(301, "/")
  } else {
    if (url.pathname !== "/login") redirect(301, "/login")
  }

  return {
    cookies: cookies.getAll(),
    user
  }
}