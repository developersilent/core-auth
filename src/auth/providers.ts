import type { NextAuthConfig } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { env } from "@/env";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "@/db/db";

const adapter = DrizzleAdapter(db);

export const authProviders: NextAuthConfig = {
  adapter,
  providers: [
    GitHubProvider({
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
    }),
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
  ],
};
