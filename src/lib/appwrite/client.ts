import { PUBLIC_APPWRITE_ENDPOINT, PUBLIC_APPWRITE_PROJECT } from "$env/static/public";
import { COOKIE } from "$lib/constants";
import { Client } from "appwrite";
import { browser } from "$app/environment";

export class Appwrite {
  private client: Client

  constructor(cookies: { name: string, value: string }[]) {
    this.client = new Client()
      .setEndpoint(PUBLIC_APPWRITE_ENDPOINT)
      .setProject(PUBLIC_APPWRITE_PROJECT)
    ;

    const cookie = cookies.find(cookie => cookie.name === COOKIE.APPWRITE)
    if (cookie) {
      this.client.setSession(cookie.value)

      if (browser) {
        const cookieFallback: Record<string, string> = {}
        cookieFallback[`a_session_${PUBLIC_APPWRITE_PROJECT}`] = cookie.value
        window.localStorage.setItem("cookieFallback", JSON.stringify(cookieFallback))
      }
    }
  }
}