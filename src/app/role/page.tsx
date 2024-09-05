import { User } from "lucide-react";
import { getUserRole, setUserRole } from "../actions";
import { redirect } from 'next/navigation'
import { auth } from "@/lib/auth";

export default async function Page() {
  const session = await auth();

  const role = await getUserRole(session?.user?.id ?? "");
  if (role != undefined) {
    redirect("/dashboard");
  }

  return (
    <div className="h-screen flex justify-center items-center">
      <div>
        <h1>Choose a role to proceed</h1>
        <div className="flex justify-around gap-4 p-2">
          <div
            onClick={async () => {
              await setUserRole(session?.user?.id ?? "", "USER");
            }}
            className="flex flex-col justify-center items-center">
            <User size={40} />
            <h2>User</h2>
          </div>
          <div
            onClick={async () => {
              await setUserRole(session?.user?.id ?? "", "ADMIN");
            }}
            className="flex flex-col justify-center items-center">
            <User size={40} />
            <h2>Admin</h2>
          </div>
        </div>
      </div>
    </div >
  );
}