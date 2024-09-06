"use client"

import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useSession } from "next-auth/react";
import { getUserEvents } from "@/app/actions";

const UserCalendars = () => {
  const session = useSession();
  const [events, setEvents] = useState<{ id: string; title: string; start: string; end: string | null; }[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [selectedEvent, setSelectedEvent] = useState<{
    title: string; start: string; end: string | null
  } | null>(null);
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    async function fetchData() {
      const data = await getUserEvents(session.data?.user?.id ?? " ");
      setData(data);

      const mappedEvents = data.map(event => ({
        id: event.id,
        title: event.name,
        start: new Date(event.StartDate).toISOString(),
        end: event.EndDate ? new Date(event.EndDate).toISOString() : null
      }));

      setEvents(mappedEvents);
    }

    fetchData();
  }, []);


  return (
    <div className="w-full px-5 rounded-lg border-2 h-full">
      <div className="flex w-full px-10 justify-start items-start gap-8">
        <div className="w-full mt-4">
          <FullCalendar
            height={"85vh"}
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
            }}
            eventTimeFormat={{ hour12: false }}
            events={events as any}
            initialView="dayGridMonth"
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            nowIndicator={true}
            displayEventTime={true}
            eventClick={(info) => {
              setSelectedEvent({
                title: info.event.title,
                start: info.event.start ? info.event.start.toISOString() : "",
                end: info.event.end ? info.event.end.toISOString() : null
              });
              setIsDialogOpen(true);
              console.log(info);
            }}
          />
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Admin Scheduled Event</DialogTitle>
          </DialogHeader>
          <div>
            {
              selectedEvent && (
                <div>
                  <p><span className="text-green-200">Event name:</span> {selectedEvent.title}</p>
                  <div className="flex gap-4">
                    <span className="text-green-200">From: </span>
                    {
                      selectedEvent.start && (
                        <p>{new Date(selectedEvent.start).toDateString()}</p>
                      )
                    }
                    <span>to</span>
                    {
                      selectedEvent.end && (
                        <p>{new Date(selectedEvent.end).toDateString()}</p>
                      )
                    }
                  </div>
                  {
                    data.filter(item => item.name === selectedEvent.title).map(item => (
                      <div key={item.id} className="flex gap-4">
                        <div className="text-green-200">Time Slot (24Hrs format) : </div>
                        <div className="flex gap-4">
                          <span>{item.start}</span>
                          <span>to</span>
                          <span>{item.end}</span>
                        </div>
                      </div>
                    ))
                  }
                </div>
              )
            }
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserCalendars;