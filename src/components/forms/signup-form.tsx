"use client";

import { IconEye, IconEyeOff, IconAlertTriangle } from "@tabler/icons-react";

import Link from "next/link";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { signUpFormSchema, signUpFormValues } from "@/types/zod.form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { GoogleLogin } from "@/components/forms/google-login";
import Image from "next/image";
import { GitHubLogin } from "./github-login";
import appLogo from "@/../public/assets/auth-logo.svg";

export default function SignInForm() {
  const [showPassword, setShowPassword] = useState(false);
  const rhf = useForm<signUpFormValues>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });
  const { errors, dirtyFields } = rhf.formState;
  const submitForm = (data: signUpFormValues) => {
    console.log(data);
  };
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-5 lg:px-8">
      {/* Logo */}
      <div className="my-6 flex flex-col items-center justify-center sm:mx-auto sm:w-full sm:max-w-sm">
        <Image
          alt="Your Company"
          src={appLogo.src}
          width={50}
          height={50}
          className="mx-auto h-14 w-auto"
        />
        <h2 className="mt-3 text-center text-[17px] font-bold text-gray-800">
          Sign up to continue
        </h2>
      </div>
      <div className="grid gap-2.5 sm:mx-auto sm:w-full sm:max-w-sm">
        <GoogleLogin />
        <GitHubLogin />
      </div>
      <div className="relative my-5 select-none border-t bg-background sm:mx-auto sm:w-full sm:max-w-sm">
        <span
          className={
            "absolute -top-3 right-[46%] bg-white p-1 px-3 text-xs text-gray-600"
          }
        >
          OR
        </span>
      </div>

      {/* Form */}
      <div className="mt-2 sm:mx-auto sm:w-full sm:max-w-sm">
        <Form {...rhf}>
          <form
            onSubmit={rhf.handleSubmit(submitForm)}
            className="flex flex-col gap-2"
          >
            <div className="space-y-[12px]">
              {/* Input */}

              <FormField
                control={rhf.control}
                name={"username"}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative">
                        <Input
                          id="username"
                          type="text"
                          placeholder="Username"
                          className="rounded-xl pl-4 pr-[41px] text-xs placeholder:text-xs max-sm:h-11"
                          {...field}
                        />
                        {errors.username && (
                          <div className="absolute right-0.5 top-1/2 grid h-full w-[10%] -translate-y-1/2 transform select-none place-content-center rounded-full px-0.5">
                            <IconAlertTriangle
                              size={16}
                              className="text-red-600"
                            />
                          </div>
                        )}
                      </div>
                    </FormControl>
                    <FormMessage className="inline px-2 text-[11px] text-red-600" />
                  </FormItem>
                )}
              />

              <FormField
                control={rhf.control}
                name={"email"}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative">
                        <Input
                          id="email"
                          type="email"
                          placeholder="Email"
                          className="rounded-xl pl-4 pr-[41px] text-xs placeholder:text-xs max-sm:h-11"
                          {...field}
                        />
                        {errors.email && (
                          <div className="absolute right-0.5 top-1/2 grid h-full w-[10%] -translate-y-1/2 transform select-none place-content-center rounded-full px-0.5">
                            <IconAlertTriangle
                              size={16}
                              className="text-red-600"
                            />
                          </div>
                        )}
                      </div>
                    </FormControl>
                    <FormMessage className="inline px-2 text-[11px] text-red-600" />
                  </FormItem>
                )}
              />

              <FormField
                control={rhf.control}
                name={"password"}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative">
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Password"
                          className={`rounded-xl pl-4 pr-[41px] placeholder:text-xs max-sm:h-11 text-xs`}
                          {...field}
                        />
                        {errors.password ? (
                          <div className="absolute right-0.5 top-1/2 grid h-full w-[10%] -translate-y-1/2 transform select-none place-content-center rounded-full px-0.5">
                            <IconAlertTriangle
                              size={16}
                              className="text-red-600"
                            />
                          </div>
                        ) : (
                          dirtyFields.password && (
                            <div
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-0.5 top-1/2 grid h-full w-[10%] -translate-y-1/2 transform cursor-pointer select-none place-content-center rounded-full"
                            >
                              {showPassword ? (
                                <IconEye size={20} className="text-zinc-800" />
                              ) : (
                                <IconEyeOff
                                  size={20}
                                  className="text-zinc-800"
                                />
                              )}
                            </div>
                          )
                        )}
                      </div>
                    </FormControl>
                    <FormMessage className="inline px-2 text-[11px] text-red-600" />
                  </FormItem>
                )}
              />
            </div>

            {/* Button */}
            <div className="my-2">
              <Button
                type="submit"
                variant={"btn"}
                className={
                  "flex w-full rounded-xl border border-border px-4 py-2 max-sm:h-11"
                }
              >
                <span className={"text-xs text-white"}>Sign up</span>
              </Button>
            </div>
          </form>
        </Form>

        <p className="text-center text-sm/6 text-gray-500">
          Already have an account?
          <Link
            href="/signin"
            className="px-1 font-semibold text-indigo-600 underline hover:text-indigo-500"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
