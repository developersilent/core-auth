import type {NextAuthConfig} from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import {env} from "@/env";

export const authProviders: NextAuthConfig = {
    providers: [
        GitHubProvider({
            clientId: env.GITHUB_CLIENT_ID,
            clientSecret: env.GITHUB_CLIENT_SECRET
        })
    ]
}