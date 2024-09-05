"use client"

import { getAllUsers } from "@/app/actions"
import { Availability, DayAvailability, User } from "@prisma/client"
import { SquareMousePointer } from "lucide-react"
import { useEffect, useState } from "react"

export default function AdminAvailability() {
  const [users, setUsers] = useState<User[]>([])
  // const [availability, setAvailability] = useState<Availability>()

  useEffect(() => {
    async function fetchData() {
      const data = await getAllUsers();
      setUsers(data);
    }

    fetchData();
  }, [])

  return (
    <div className="h-full rounded-lg shadow-lg border-2 p-4">
      <div className="flex gap-2 justify-between items-center">
        <div className="flex gap-2 items-center pb-4">
          <SquareMousePointer />
          <h1>
            User's time availability
          </h1>
        </div>
      </div>
      <div className="flex-col gap-4 rounded-lg p-4 flex">
        {
          users.map((user) => (
            <div key={user.id} className="flex gap-2 items-center">
              <h1>
                {user.name}
              </h1>
              <div className="flex gap-2">
                <div className="flex gap-2">
                </div>
              </div>
            </div>
          ))
        }
      </div >
    </div >
  )
}