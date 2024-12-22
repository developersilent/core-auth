"use server";
import { serverApi } from "@/server/trpc/server.api";
import { signInFormValues, signUpFormValues } from "@/types/zod.form";

import { signIn, signOut } from "@/auth";

export async function googleAuthAction() {
  await signIn("google");
}
export async function githubAuthAction() {
  await signIn("github");
}
export async function signUpAction(data: signUpFormValues) {
  const res = await serverApi.Auth.SignUp(data);
  return res;
}
export async function signInAction(data: signInFormValues) {
  const res = await serverApi.Auth.SignIn(data);
  if (res.successStatus) {
    await callAuthLoginApi(data);
  }
  return res;
}

async function callAuthLoginApi(params: signInFormValues) {
  await signIn("credentials", {
    redirect: true,
    redirectTo: "/",
    email: params.email,
    password: params.password,
  });
}

export async function signOutAction() {
  await signOut({
    redirect: true,
    redirectTo: "/signin",
  });
}
