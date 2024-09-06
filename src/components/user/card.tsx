import { Edit, Trash } from "lucide-react";
import { Button, buttonVariants } from "../ui/button";
import { DeleteUserAvailability, updateUserAvailability } from "@/app/actions";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import AvailabilityPicker from "./availability-picker";
interface CardProps {
  availability: Record<string, DayAvailability>;
  setAvailability: React.Dispatch<React.SetStateAction<Record<string, DayAvailability>>>;
  title: string;
  time: DayAvailability[];
  id: string;
}

export default function Card({
  availability,
  setAvailability,
  title,
  time,
  id
}: CardProps) {
  function convertTime(time: string) {
    const [hours, minutes] = time.split(":");
    const suffix = parseInt(hours) >= 12 ? "PM" : "AM";
    const h = parseInt(hours) % 12 || 12;
    return `${h}:${minutes} ${suffix}`;
  }

  return (
    <div className="card rounded-lg w-full bg-[#18181B] p-5 flex justify-between items-center">
      <div className="flex flex-col justify-between">
        <h1 className="text-lg font-bold">{title}</h1>
        {
          time.map((t, i) => (
            t.enabled && (
              <div key={i} className="flex gap-2 items-center">
                <span>{t.day.slice(0, 3)}</span>
                <span>{convertTime(t.from)} - {convertTime(t.to)}</span>
              </div>
            )
          ))
        }
      </div>
      <div className="flex gap-4">
        <button
          onClick={async () => {
            await DeleteUserAvailability(id, title);
            window.location.reload();
          }}
          className={"mr-4 " + buttonVariants({ variant: "destructive" })}>
          <Trash size={25} />
        </button>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="flex gap-2">
              <Edit size={20} />
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
                await updateUserAvailability(id, title, availability);
                window.location.reload();
              }}>
                Save changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div >
  );
}