import { Trash } from "lucide-react";
import { buttonVariants } from "../ui/button";

interface CardProps {
  title: string;
  time: string;
  timeZone: string;
}

export default function Card({
  title,
  time,
  timeZone,
}: CardProps) {
  return (
    <div className="card h-28 rounded-lg w-full bg-[#18181B] p-5 flex justify-between items-center">
      <div className="flex flex-col justify-between">
        <h1 className="text-lg font-bold">{title}</h1>
        <p className="text-sm">{time}</p>
        <p className="text-sm pr-2">{timeZone}</p>
      </div>
      <button className={buttonVariants({ variant: "destructive" })}>
        <Trash size={25} />
      </button>
    </div>
  );
}