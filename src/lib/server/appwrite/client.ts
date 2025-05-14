import { PUBLIC_APPWRITE_ENDPOINT, PUBLIC_APPWRITE_PROJECT } from "$env/static/public";
import { Account, Client } from "appwrite";
import type { Cookies } from "@sveltejs/kit";
import { COOKIE } from "$lib/constants";

export class AppwriteServer {
  private readonly client: Client
  private account: Account

  constructor(cookies: Cookies) {
    this.client = new Client()
      .setEndpoint(PUBLIC_APPWRITE_ENDPOINT)
      .setProject(PUBLIC_APPWRITE_PROJECT)
    ;
    const session = cookies.get(COOKIE.APPWRITE)
    if (session) this.client.setSession(session)

    this.account = new Account(this.client)
  }

  async getUser() {
    try {
      return await this.account.get();
    } catch {
      return undefined;
    }
  }

  logout() {
    return this.account.deleteSession("current")
  }
}