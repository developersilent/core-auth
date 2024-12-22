import { createCallerFactory, createTRPCRouter } from "@/server/trpc/init";
import { authRoutes } from "@/server/api/routes/auth";

export const appRouter = createTRPCRouter({
  Auth: authRoutes,
});

export type AppRouter = typeof appRouter;

export const createCaller = createCallerFactory(appRouter);
