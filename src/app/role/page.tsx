"use client"

import { User } from "lucide-react";
import { getUserRole, setUserRole } from "../actions";
import { useRouter } from 'next/navigation'
import { useEffect } from "react";
import { Role } from "@prisma/client";
import { useSession } from "next-auth/react";

export default function Page() {
  const session = useSession();
  const router = useRouter()

  useEffect(() => {
    const fetchData = async () => {
      if (session.data?.user?.id) {
        const role = await getUserRole(session.data?.user?.id);
        if (role) {
          router.push("/dashboard");
        }
      }
    };

    fetchData();
  }, [session.data?.user?.id]);

  const handleUserRole = async (newRole: Role) => {
    if (session.data?.user?.id) {
      await setUserRole(session.data?.user?.id, newRole);
      router.push("/dashboard");
    }
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <div>
        <h1>Choose a role to proceed</h1>
        <div className="flex justify-around gap-4 p-2 cursor-pointer">
          <div
            onClick={() => handleUserRole("USER")}
            className="flex flex-col justify-center items-center">
            <User size={40} />
            <h2>User</h2>
          </div>
          <div
            onClick={() => handleUserRole("ADMIN")}
            className="flex flex-col justify-center items-center">
            <User size={40} />
            <h2>Admin</h2>
          </div>
        </div>
      </div>
    </div>
  );
}