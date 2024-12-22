import { authProviders } from "@/auth/providers";
import NextAuth from "next-auth";

export const { auth, handlers, signIn, signOut } = NextAuth(authProviders);
