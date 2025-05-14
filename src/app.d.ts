import type { AppwriteServerAdmin } from "$lib/server/appwrite/admin/client";
import type { AppwriteServer } from "$lib/server/appwrite/client";

declare global {
	namespace App {
		interface Locals {
			aw: AppwriteServer
			admin: AppwriteServerAdmin
		}
	}
}
