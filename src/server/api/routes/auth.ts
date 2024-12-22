import { db } from "@/db/db";
import { users } from "@/db/schema/schema";
import { createTRPCRouter, publicProcedure } from "@/server/trpc/init";
import { AuthRouterReturnMessage } from "@/types/return.types";
import { signInFormSchema, signUpFormSchema } from "@/types/zod.form";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { User } from "next-auth";

export const authRoutes = createTRPCRouter({
  SignUp: publicProcedure
    .input(signUpFormSchema)
    .mutation(async ({ input }): Promise<AuthRouterReturnMessage> => {
      const formInputs = signUpFormSchema.safeParse(input);
      if (!formInputs.success) {
        return {
          successStatus: false,
          message: "Invalid form inputs",
        };
      }
      const { email, password, username } = formInputs.data;
      try {
        const isUserExist = await db.query.users.findFirst({
          where: eq(users.email, email),
        });

        if (isUserExist) {
          return {
            successStatus: false,
            message: "User already exist",
          };
        }

        const hashPassword = await bcrypt.hash(password, 11);
        if (!hashPassword) {
          return {
            successStatus: false,
            message: "Something went wrong, please try again !",
          };
        }
        const createUser = await db.insert(users).values({
          username,
          email,
          password: hashPassword,
        });
        if (!createUser) {
          return {
            successStatus: false,
            message: "Failed to create your account, please try again !",
          };
        }
        return {
          successStatus: true,
          message: "User created successfully",
        };
      } catch (error) {
        return {
          successStatus: false,
          message: "Internal server error, please try again !",
        };
      }
    }),
  SignIn: publicProcedure
    .input(signInFormSchema)
    .mutation(async ({ input }) => {
      const formInputs = signInFormSchema.safeParse(input);
      if (!formInputs.success) {
        return {
          successStatus: false,
          message: "Invalid form inputs",
        };
      }
      const { email, password } = formInputs.data;
      try {
        const getUser = await db.query.users.findFirst({
          where: eq(users.email, email),
        });
        if (!getUser) {
          return {
            successStatus: false,
            message: "User not found",
          };
        }
        const matchPassword = await bcrypt.compare(
          password,
          getUser.password as string,
        );
        if (!matchPassword) {
          return {
            successStatus: false,
            message: "Invalid Credentials",
          };
        }
        return {
          successStatus: true,
          message: "User data is sent",
          user: getUser,
        };
      } catch (error) {
        return {
          successStatus: false,
          message: "Internal server error, please try again !",
        };
      }
    }),
  GetAuthApiUser: publicProcedure
    .input(signInFormSchema)
    .mutation(async ({ input }): Promise<User | null> => {
      const res = await db.query.users.findFirst({
        where: eq(users.email, input.email),
      });
      if (!res) {
        return null;
      }
      return res as User;
    }),
});
