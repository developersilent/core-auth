"use server";

import { signIn } from "@/auth";

export async function googleAuthAction() {
  const res = await signIn("google");
  console.log("LOG",res);
}
export async function githubAuthAction() {
  const res = await signIn("github");
  console.log("LOG",res);
}
export async function signUpAction() {}
export async function signInAction() {}
export async function signOutAction() {}
