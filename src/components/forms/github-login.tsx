import { Button } from "@/components/ui/button";
import { githubAuthAction } from "@/server/actions/auth.actions";
import Image from "next/image";
import githubIcon from "@/../public/assets/github-logo.svg";
import { type ImageScrProps } from "@/types/return.types";

const imageSrc = githubIcon as ImageScrProps;

export function GitHubLogin() {
  return (
    <form action={githubAuthAction} className="select-none">
      <Button
        type="submit"
        variant={"providers"}
        className={
          "flex w-full rounded-xl border border-border px-4 py-2 max-sm:h-11"
        }
      >
        <Image src={imageSrc.src} alt="github-logo" width={25} height={25} />
        <span className={"text-xs text-black/90"}>Continue with GitHub</span>
      </Button>
    </form>
  );
}
