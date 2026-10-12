import { betterAuth } from "better-auth";
import Database from "better-sqlite3";
import path from "path";

const dbPath = path.join(process.cwd(), "bazardor.db");
const db = new Database(dbPath);

export const auth = betterAuth({
  database: db,
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID || "demo_google_id",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "demo_google_secret",
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID || "demo_github_id",
      clientSecret: process.env.GITHUB_CLIENT_SECRET || "demo_github_secret",
    },
  },
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
  secret: process.env.BETTER_AUTH_SECRET || "bazardor-secret-key-super-secure-assignment-7-batch-14",
});