import { signIn } from "@/auth";
import { Github, LogInIcon } from "lucide-react";

export default function SignIn() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("github");
      }}
    >
      <button type="submit"><LogInIcon /></button>
    </form>
  );
}
