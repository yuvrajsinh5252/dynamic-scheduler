"use client"

import { ArrowRight, Plus } from "lucide-react"
import Card from "./card"
import { Button } from "../ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import AvailabilityPicker from "./availability-picker"
import { useEffect, useState } from "react"
import { createUserAvailability, getUserAvailability } from "@/app/actions"
import { useSession } from "next-auth/react"
import { Availability } from "@prisma/client"

export default function UserAvailability() {
  const session = useSession();
  const [data, setData] = useState<Availability[]>([]);

  const daysOfWeek: string[] = [
    "Sunday", "Monday", "Tuesday", "Wednesday",
    "Thursday", "Friday", "Saturday"
  ];

  const [availability, setAvailability] = useState<Record<string, DayAvailability>>(
    daysOfWeek.reduce((acc, day) => {
      acc[day] = {
        day,
        enabled: false,
        from: "09:00", to: "17:00",
      };
      return acc;
    }, {} as Record<string, DayAvailability>)
  );

  useEffect(() => {
    async function func() {
      if (session.data?.user?.id) {
        const data = await getUserAvailability(session.data?.user?.id);
        setData(data ?? []);
      }
    }
    func();
  }, [session.data?.user?.id]);

  return (
    <div className="h-full rounded-lg shadow-lg border-2 p-4">
      <div className="flex gap-2 justify-between items-center">
        <div className="flex gap-2 items-center pb-4">
          <ArrowRight />
          <h1>Add you availability intervals here</h1>
        </div>
        <div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="flex gap-2 mr-4">
                <Plus size={20} />
                <p>Interval</p>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add Interval</DialogTitle>
                <DialogDescription></DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input
                    id="name"
                    defaultValue="Pedro Duarte"
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <AvailabilityPicker availability={availability} setAvailability={setAvailability} />
                </div>
              </div>
              <DialogFooter>
                <Button onClick={async () => {
                  if (session.data?.user?.id) await createUserAvailability(session.data?.user?.id, availability);
                }}>
                  Save changes
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div className="flex-col gap-4 rounded-lg p-4 flex">
        {
          data.length > 0 ? data.map((item, index) => (
            <Card key={index} title={item.name} time={item.days} id={session.data?.user?.id ?? " "} />
          )) : <div>No data</div>
        }
      </div >
    </div >
  )
}



