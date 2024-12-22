import { MiddlewareConfig } from "next/server";
import { auth } from "@/auth";
import { env } from "@/env";

const publicPaths = env.PUBLIC_API_ENDPOINTS?.split(",") || [];

export default auth((req) => {
  const { nextUrl } = req;
  const isPublicPath = publicPaths.some((path) =>
    nextUrl.pathname.startsWith(path),
  );
  const isAuth = !!req.auth;

  if (nextUrl.pathname.startsWith(env.AUTH_API_ENDPONT)) {
    return;
  }
  if (isAuth && nextUrl.pathname.startsWith(env.PROTECTED_API_ENDPOINTS)) {
    return Response.redirect(new URL(env.SIGNIN_SINGUP_REDIRECT_URL, nextUrl));
  }

  if (isAuth && nextUrl.pathname.startsWith(env.AUTH_API_ENDPONT)) {
    return Response.redirect(new URL(env.SIGNIN_SINGUP_REDIRECT_URL, nextUrl));
  }

  if (isPublicPath && isAuth) {
    return Response.redirect(new URL(env.SIGNIN_SINGUP_REDIRECT_URL, nextUrl));
  }
  if (!isPublicPath && !isAuth) {
    return Response.redirect(new URL(env.SIGNOUT_REDIRECT_URL, nextUrl));
  }
});

export const config: MiddlewareConfig = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
