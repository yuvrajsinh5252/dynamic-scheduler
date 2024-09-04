"use client";

import { User } from "lucide-react";
import { setUserRole } from "../actions";
import { useSession } from "next-auth/react";

export default function Page() {
  const { data: session } = useSession()
  console.log(session);

  return (
    <div className="h-screen flex justify-center items-center">
      <div>
        <h1>Choose a role to proceed</h1>
        <div className="flex justify-around gap-4 p-2">
          <div
            onClick={async () => {
              await setUserRole("id", "role");
            }}
            className="flex flex-col justify-center items-center">
            <User size={40} />
            <h2>User</h2>
          </div>
          <div
            // onClick={() => {
            // }}
            className="flex flex-col justify-center items-center">
            <User size={40} />
            <h2>Admin</h2>
          </div>
        </div>
      </div>
    </div>
  );
}