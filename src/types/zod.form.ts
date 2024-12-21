import { z } from "zod";


export const signInFormSchema = z.object({
  email: z.string().min(1, {message: "Email is required"}).email(),
  password: z.string().min(1, {message: "Password is required"})
})

export type signInFormValues = z.infer<typeof signInFormSchema>

export const signUpFormSchema = z.object({
  username: z.string().min(1, {message: "Username is required"}).toLowerCase().max(50, {
    message: "Username is too long"
  }),
  email: z.string().min(1, {message: "Email is required"}).email(),
  password: z.string().min(1, {message: "Password is required"})
})

export type signUpFormValues = z.infer<typeof signUpFormSchema>