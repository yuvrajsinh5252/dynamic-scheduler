import { Trash } from "lucide-react";
import { buttonVariants } from "../ui/button";
import { DeleteUserAvailability } from "@/app/actions";

interface CardProps {
  title: string;
  time: DayAvailability[];
  id: string;
}

export default function Card({
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
      <button
        onClick={async () => {
          await DeleteUserAvailability(id, title);
        }}
        className={buttonVariants({ variant: "destructive" })}>
        <Trash size={25} />
      </button>
    </div >
  );
}