import { auth } from "@/auth";
import { env } from "@/env";
import { redirect } from "next/navigation";

export default async function AuthLayout({ children }: { children: React.ReactNode }) {
    const session = await auth();
    if (session && session.user) {
        redirect(env.SIGNIN_SINGUP_REDIRECT_URL);
    }
    return (
        <>
            {children}
        </>
    );
}