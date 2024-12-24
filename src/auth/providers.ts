import { type NextAuthConfig } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { env } from "@/env";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "@/db/db";
import CredentialsProvider from "next-auth/providers/credentials";
import { encode as DefaultEncode } from "next-auth/jwt";
import { serverApi } from "@/server/trpc/server.api";
import { v4 as uuid } from "uuid";

const adapter = DrizzleAdapter(db);

export const authProviders: NextAuthConfig = {
  adapter,
  providers: [
    GitHubProvider({
      clientId: env.AUTH_GITHUB_ID,
      clientSecret: env.AUTH_GITHUB_SECRET,
    }),
    GoogleProvider({
      clientId: env.AUTH_GOOGLE_ID,
      clientSecret: env.AUTH_GOOGLE_SECRET,
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
          return res;
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account?.provider === "credentials") {
        token.credentials = true;
      }
      return token;
    },
  },
  jwt: {
    async encode(params) {
      if (params.token?.credentials) {
        const sessionToken = uuid();
        if (!sessionToken) {
          throw new Error("Session token not generated");
        }
        if (!params.token.sub) {
          throw new Error("User id not found");
        }
        const createSession = await adapter.createSession?.({
          sessionToken: sessionToken,
          userId: params.token.sub,
          expires: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000), // 10 days
        });
        if (!createSession) {
          throw new Error("Session not created");
        }
        return sessionToken;
      }
      return DefaultEncode(params);
    },
  },
};
