import React, { useState, useEffect, ReactNode } from "react";
import {
  formatDate,
  DateSelectArg,
  EventClickArg,
} from "@fullcalendar/core";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"


import { createEvent, getAllUsers, getEvents } from "@/app/actions";
import { User } from "@prisma/client";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Trash } from "lucide-react";
import { checkValidity } from "@/lib/validator";

export default function AdminCalendars(): ReactNode {
  const [currentEvents, setCurrentEvents] = useState<any[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [newEventTitle, setNewEventTitle] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<DateSelectArg | null>(null);
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [selectedUserid, setSelectedUserid] = useState<string[]>([]);
  const [startTime, setSatrtTime] = useState<string | null>(null);
  const [endTime, setEndTime] = useState<string | null>(null);
  const [availability, setAvailability] = useState<any[]>([]);

  useEffect(() => {
    const events = async () => {
      const user = await getAllUsers();
      setAllUsers(user);
      setAvailability(
        user.map((user) => {
          return {
            id: user.id,
            name: user.name,
            schedule: user.Availability,
          };
        })
      );

      const data = await getEvents();

      const mappedEvents = data.map((event) => ({
        id: event.id,
        title: event.name,
        timeStart: event.start,
        timeEnd: event.end,
        start: new Date(event.StartDate),
        end: new Date(event.EndDate),
        eventUsers: event.EventUser.map((item) => {
          const userss = user.find((users) => users.id === item.userId);
          return {
            id: userss?.id,
            name: userss?.name,
          };
        }),
      }));

      setCurrentEvents(mappedEvents);
    }

    events();
  }, []);

  const handleDateClick = (selected: DateSelectArg) => {
    setSelectedDate(selected);
    setIsDialogOpen(true);
  };

  const handleEventClick = (selected: EventClickArg) => {
    if (
      window.confirm(
        `Are you sure you want to delete the event "${selected.event.title}"?`
      )
    ) {
      selected.event.remove();
    }
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setNewEventTitle("");
  };

  const handleAddEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (newEventTitle && selectedDate && startTime && endTime) {
      const calendarApi = selectedDate.view.calendar;
      calendarApi.unselect();

      const createEvents = async (startDate: any, endDate: any) => {
        if (startTime && endTime) {
          await createEvent(newEventTitle, startDate, endDate, startTime, endTime, selectedUserid);
        } else {
          alert("Please select start and end time");
        }
      }

      let [newHours, newMinutes] = startTime.split(':').map(Number);
      let [endHours, endMinutes] = endTime.split(':').map(Number);

      const startDate = new Date(selectedDate.start);
      const endDate = new Date(selectedDate.end);

      // const events = [];

      for (let d = new Date(startDate); d < endDate; d.setDate(d.getDate() + 1)) {
        let eventStart = new Date(d);
        eventStart.setHours(newHours, newMinutes, 0, 0);

        let eventEnd = new Date(d);
        eventEnd.setHours(endHours, endMinutes, 0, 0);

        // events.push({
        //   id: `${d.toISOString()}-${newEventTitle}`,
        //   title: newEventTitle,
        //   start: eventStart,
        //   end: eventEnd,
        //   allDay: false,
        // });

        createEvents(eventStart, eventEnd);
      }

      calendarApi.refetchEvents();
      handleCloseDialog();
    };
  }

  return (
    <div className="w-full px-5 rounded-lg border-2 h-full">
      <div className="flex w-full px-10 justify-start items-start gap-8">
        <div className="w-3/12 flex flex-col items-center justify-center">
          <div className="py-10 text-2xl font-extrabold">
            Calendar Events
          </div>
          <ul className="space-y-4 p-2 max-h-[68vh] overflow-scroll">
            {currentEvents.length <= 0 && (
              <div className="italic text-center">
                No Events Present
              </div>
            )}

            {currentEvents.length > 0 &&
              currentEvents.map((event, index) => (
                <li
                  className="border border-gray-200 shadow px-4 py-2 rounded-md w-96"
                  key={index}
                >
                  {event.title}
                  <br />
                  <label className="">
                    {formatDate(event.start!, {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}{" - "}
                    {formatDate(event.end!, {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}{" "}
                  </label>
                  <div>
                    <span className="mr-4">Slot</span>
                    {event.timeStart} - {event.timeEnd}
                  </div>
                  <Accordion type="single" collapsible>
                    <AccordionItem value="item-1">
                      <AccordionTrigger>Participants</AccordionTrigger>
                      <AccordionContent>
                        {
                          event?.eventUsers?.map((user: any) => {
                            return (
                              <div key={user.id} className="flex gap-2">
                                <span>{user.name}</span>
                              </div>
                            )
                          })
                        }
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </li>
              ))}
          </ul>
        </div>

        <div className="w-9/12 mt-8">
          <FullCalendar
            height={"85vh"}
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
            }}
            initialView="dayGridMonth"
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            select={handleDateClick}
            eventClick={handleEventClick}
            events={currentEvents}
            nowIndicator={true}
            eventTimeFormat={{ hour12: false }}
            initialEvents={() => currentEvents}
          />
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Event Details</DialogTitle>
          </DialogHeader>
          <form className="space-x-5 mb-4 flex flex-col gap-10" onSubmit={handleAddEvent}>
            <Input
              type="text"
              placeholder="Event Title"
              value={newEventTitle}
              onChange={(e) => setNewEventTitle(e.target.value)}
              required
            />
            <div className="flex gap-10">
              <Label>
                Start Date: {selectedDate?.start?.toLocaleDateString()}
              </Label>
              <Label>
                End Date: {selectedDate?.end?.toLocaleDateString()}
              </Label>
            </div>
            <div>
              <Label>
                Start Time:
              </Label>
              <Input
                type="time"
                onChange={(e) => { setSatrtTime(e.target.value) }}
                value={startTime ?? " "}
              />
            </div>
            <div>
              <Label>
                End Time:
              </Label>
              <Input
                type="time"
                onChange={(e) => setEndTime(e.target.value)}
                value={endTime ?? " "}
              />
            </div>
            <Select>
              <SelectTrigger className="w-96">
                <SelectValue placeholder="selectUsers" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="asd" className="flex gap-2">
                  {
                    selectedUserid.map((id, index) => (
                      <div
                        key={index}
                        className="p-2 flex gap-3"
                      >
                        <span>{index + 1}</span>
                        {allUsers.find((user) => user.id === id)?.name}
                      </div>
                    ))
                  }
                </SelectItem>
                {
                  allUsers.map((user, index) => (
                    checkValidity(
                      selectedDate?.start?.toLocaleDateString() ?? "",
                      selectedDate?.end?.toLocaleDateString() ?? "",
                      startTime ?? "",
                      endTime ?? "",
                      availability.find((item) => item.id === user.id)?.schedule,
                    ) ? (
                      <div
                        key={index}
                        className="p-2 onhover:bg-gray-200 cursor-pointer flex justify-between items-center"
                        onClick={() => {
                          if (!selectedUserid.includes(user.id)) {
                            setSelectedUserid([...selectedUserid, user.id]);
                          }
                        }}
                      >
                        <span>{user.name}</span>
                        <span>
                          <Trash
                            size={16}
                            onClick={() => {
                              setSelectedUserid(selectedUserid.filter((id) => id !== user.id));
                            }}
                          />
                        </span>
                      </div>
                    ) : null
                  ))
                }
              </SelectContent>
            </Select>

            <Button
              type="submit"
            >
              Add Event
            </Button>{" "}
          </form>
        </DialogContent>
      </Dialog>
    </div >
  );
};