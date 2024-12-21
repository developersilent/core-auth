import { Button } from "@/components/ui/button";
import { googleAuthAction } from "@/server/actions/auth.actions";
import Image from "next/image";
import googleIcon from "@/../public/assets/google-logo.svg";

export function GoogleLogin() {
  return (
    <form action={googleAuthAction} className="select-none">
      <Button
        type="submit"
        variant={"providers"}
        className={
          "flex w-full rounded-xl border border-border px-4 py-2 max-sm:h-11"
        }
      >
        <Image
          src={googleIcon.src}
          alt="github-logo"
          width={19}
          height={19}
        />
        <span className={"text-xs text-black/90"}>Continue with Google</span>
      </Button>
    </form>
  );
}
