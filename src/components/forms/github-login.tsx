import { Button } from "@/components/ui/button";
import { githubAuthAction } from "@/server/actions/auth.actions";
import Image from "next/image";
import githubIcon from "@/../public/assets/github-logo.svg";
export function GitHubLogin() {
  return (
    <form action={githubAuthAction}>
      <Button
        type="submit"
        variant={"providers"}
        className={
          "flex w-full rounded-xl border border-border px-4 py-2 max-sm:h-11"
        }
      >
        <Image
          src={githubIcon.src}
          alt="github-logo"
          width={25}
          height={25}
        />
        <span className={"text-xs text-black/90"}>Continue with GitHub</span>
      </Button>
    </form>
  );
}
