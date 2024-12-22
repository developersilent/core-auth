import { type NextAuthConfig, type User } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { env } from "@/env";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "@/db/db";
import CredentialsProvider from "next-auth/providers/credentials";
import { signInAction } from "@/server/actions/auth.actions";
import { serverApi } from "@/server/trpc/server.api";

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
    CredentialsProvider({
      name: "signin",
      type: "credentials",
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const email = credentials.email as string;
        const password = credentials.password as string;
        const res = await serverApi.Auth.GetAuthApiUser({ email, password });
        if (res) {
          return res as User;
        }
        return null;
      },
    }),
  ],
};
