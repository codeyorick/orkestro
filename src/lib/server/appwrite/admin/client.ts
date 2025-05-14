import { APPWRITE_KEY } from "$env/static/private";
import { PUBLIC_APPWRITE_ENDPOINT, PUBLIC_APPWRITE_PROJECT } from "$env/static/public";
import { Client, Account } from "node-appwrite";

export class AppwriteServerAdmin {
  private client: Client
  private account: Account

  constructor() {
    this.client = new Client()
      .setEndpoint(PUBLIC_APPWRITE_ENDPOINT)
      .setProject(PUBLIC_APPWRITE_PROJECT)
      .setKey(APPWRITE_KEY)
    ;
    this.account = new Account(this.client)
  }

  login(email: string, password: string) {
    return this.account.createEmailPasswordSession(email, password)
  }
}