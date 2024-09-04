import Link from "next/link";
import SignIn from "./signin";
import { Button, buttonVariants } from "./ui/button";
import { ModeToggle } from "./theme-toggle";
import { auth } from "@/lib/auth"
import SignOut from "./signout";

export default async function Navbar() {
  const session = await auth()

  return (
    <nav className="flex items-center justify-around p-4 shadow-md">
      <div className="flex items-center">
        <h1 className="text-lg font-bold">Dynamic Scheduler</h1>
      </div>
      <div className="flex items-center space-x-4 gap-2 divide-x-2">
        <div className="flex justify-center items-center gap-2">
          <Link href="/">
            <Button className={buttonVariants({
              variant: "secondary"
            })}>Home</Button>
          </Link>
          <Link href="/dashboard">
            <Button className={buttonVariants({
              variant: "secondary"
            })}>
              Dashboard
            </Button>
          </Link>
        </div>
        <div className="flex gap-2 justify-center items-center pl-2">
          <ModeToggle />
          {
            session ? <SignOut /> : <SignIn />
          }
        </div>
      </div>
    </nav >
  );
}