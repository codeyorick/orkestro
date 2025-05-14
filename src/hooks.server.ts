import type { Handle, ServerInit } from "@sveltejs/kit";
import { PUBLIC_APPWRITE_ENDPOINT, PUBLIC_APPWRITE_PROJECT } from "$env/static/public"
import { APPWRITE_KEY } from "$env/static/private";
import { AppwriteServerAdmin } from "$lib/server/appwrite/admin/client";
import { AppwriteServer } from "$lib/server/appwrite/client";

export const init: ServerInit = async () => {
  if (!PUBLIC_APPWRITE_ENDPOINT || !PUBLIC_APPWRITE_PROJECT || !APPWRITE_KEY) {
    throw new Error("Missing Appwrite environment variables")
  }
}

export const handle: Handle = async ({ resolve, event }) => {
  event.locals.admin = new AppwriteServerAdmin();
  event.locals.aw = new AppwriteServer(event.cookies)

  return resolve(event);
}