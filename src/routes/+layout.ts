import type { LayoutLoad } from "./$types";
import { Appwrite } from "$lib/appwrite/client";

export const load: LayoutLoad = async ({ data }) => {
  return {
    appwrite: new Appwrite(data.cookies),
    user: data.user
  }
}