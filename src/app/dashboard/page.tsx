"use client"

import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import moment from "moment";

const localizer = momentLocalizer(moment);
const DnDCalendar = withDragAndDrop(Calendar);

export default function Home() {
  return (
    <div className="flex h-screen w-screen gap-10 p-10">
      <div className="left-sidebar flex h-full flex-col items-center p-4">
      </div>
      <div className="h-full w-full">
        <DnDCalendar
          localizer={localizer}
          selectable
        />
      </div>
    </div>
  );
}
