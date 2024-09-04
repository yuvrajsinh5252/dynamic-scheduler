import { signIn } from "@/lib/auth";
import { LogInIcon } from "lucide-react";

export default function SignIn() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("github", { redirectTo: "/role" });
      }}
    >
      <button type="submit"><LogInIcon /></button>
    </form>
  );
}