"use server";

import { signIn } from "@/auth";

export async function googleAuthAction() {
  const res = await signIn("google");
  console.log(res);
}
export async function githubAuthAction() {}
export async function signUpAction() {}
export async function signInAction() {}
export async function signOutAction() {}
