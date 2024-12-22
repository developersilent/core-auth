import { signOutAction } from "@/server/actions/auth.actions";
import { Button } from "../ui/button";

export function LogoutButton() {
  return (
    <form action={signOutAction} className="select-none">
      <Button
        type="submit"
        variant={"providers"}
        className={
          "flex w-full rounded-xl border border-border px-4 py-2 max-sm:h-11"
        }
      >
        <span className={"text-xs text-black/90"}>Log out</span>
      </Button>
    </form>
  );
}
