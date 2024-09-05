"use server"

import React from "react"
import { getUserRole } from "../actions"
import { auth } from "@/lib/auth"
import UserDashboard from "@/components/user/user-dashboard"
import AdminDashboard from "@/components/admin/admin-dashboard"


export default async function Page() {
  const session = await auth()
  const role = getUserRole(session?.user?.id ?? "")

  return (
    <div>
      {
        await role === "USER" ? <UserDashboard /> : <AdminDashboard />
      }
    </div>
  )
}