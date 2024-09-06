"use client"

import { getAllUsers } from "@/app/actions"
import { Availability, User } from "@prisma/client"
import { SquareMousePointer } from "lucide-react"
import { useEffect, useState } from "react"
import { Button } from "../ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"


export default function AdminAvailability() {
  const [users, setUsers] = useState<User[]>([])
  const [availability, setAvailability] = useState<Availability[]>([])

  useEffect(() => {
    async function fetchData() {
      const data = await getAllUsers();
      setAvailability(data.map((user) => user.Availability).flat());
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
          users.map((user) => {
            return (
              <div className="flex gap-2 items-center justify-between border-2 p-4 rounded-lg">
                <h1>{user.name}</h1>
                <Dialog>
                  <DialogTrigger><Button>View Details</Button></DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>User availability details</DialogTitle>
                      <DialogDescription></DialogDescription>
                    </DialogHeader>
                    <div className="flex flex-col border-2 p-4 gap-10 rounded-lg overflow-scroll max-h-[400px]">
                      {
                        availability.map((items) => {
                          return (
                            <div className="flex gap-2 items-center p-2">
                              <div className="min-w-32">{items.name}</div>
                              {
                                items.days.map((day) => {
                                  return (
                                    day.enabled && (
                                      <div className="flex gap-2 justify-between border-2 p-4 rounded-lg">
                                        <h1>{day.day.slice(0, 3)}</h1>
                                        <h1>{day.from}</h1>{"-"}
                                        <h1>{day.to}</h1>
                                      </div>
                                    )
                                  )
                                })
                              }
                            </div>
                          )
                        })
                      }
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}