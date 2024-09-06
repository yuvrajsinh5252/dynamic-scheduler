import React, { useState, useEffect } from "react";
import {
  formatDate,
  DateSelectArg,
  EventClickArg,
  EventApi,
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

const UserCalendars = () => {
  // const [currentEvents, setCurrentEvents] = useState<EventApi[]>([]);
  // const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  // const [newEventTitle, setNewEventTitle] = useState<string>("");
  // const [selectedDate, setSelectedDate] = useState<DateSelectArg | null>(null);

  // useEffect(() => {
  //   // Load events from local storage when the component mounts
  //   if (typeof window !== "undefined") {
  //     const savedEvents = localStorage.getItem("events");
  //     if (savedEvents) {
  //       setCurrentEvents(JSON.parse(savedEvents));
  //     }
  //   }
  // }, []);

  // useEffect(() => {
  //   // Save events to local storage whenever they change
  //   if (typeof window !== "undefined") {
  //     localStorage.setItem("events", JSON.stringify(currentEvents));
  //   }
  // }, [currentEvents]);

  // const handleDateClick = (selected: DateSelectArg) => {
  //   setSelectedDate(selected);
  //   setIsDialogOpen(true);
  // };

  // const handleEventClick = (selected: EventClickArg) => {
  //   if (
  //     window.confirm(
  //       `Are you sure you want to delete the event "${selected.event.title}"?`
  //     )
  //   ) {
  //     selected.event.remove();
  //   }
  // };

  // const handleCloseDialog = () => {
  //   setIsDialogOpen(false);
  //   setNewEventTitle("");
  // };

  // const handleAddEvent = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   if (newEventTitle && selectedDate) {
  //     const calendarApi = selectedDate.view.calendar; // Get the calendar API instance.
  //     calendarApi.unselect(); // Unselect the date range.

  //     const newEvent = {
  //       id: `${selectedDate.start.toISOString()}-${newEventTitle}`,
  //       title: newEventTitle,
  //       start: selectedDate.start,
  //       end: selectedDate.end,
  //       allDay: selectedDate.allDay,
  //     };

  //     calendarApi.addEvent(newEvent);
  //     handleCloseDialog();
  //   }
  // };

  const handleShowUserEvent = async () => {
    // Logic to fetch user events from an API or database
    // Once you have the user events, you can update the calendar with the events using the calendar API

    // For example, if you have an array of user events called `userEvents`
    // You can update the calendar with the events like this:
    // calendarApi.addEventSource(userEvents);
  }
  // Call the handleShowUserEvent function to fetch and display user events
  return (
    <div className="w-full px-5 rounded-lg border-2 h-full">
      <div className="flex w-full px-10 justify-start items-start gap-8">
        <div className="w-full mt-4">
          <FullCalendar
            height={"85vh"}
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]} // Initialize calendar with required plugins.
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
            }} // Set header toolbar options.
            initialView="dayGridMonth" // Initial view mode of the calendar.
            editable={true} // Allow events to be edited.
            selectable={true} // Allow dates to be selectable.
            selectMirror={true} // Mirror selections visually.
            dayMaxEvents={true} // Limit the number of events displayed per day.
            // select={handleDateClick} // Handle date selection to create new events.
            // eventClick={handleEventClick} // Handle clicking on events (e.g., to delete them).
            // eventsSet={(events) => setCurrentEvents(events)} // Update state with current events whenever they change.
            initialEvents={
              typeof window !== "undefined"
                ? JSON.parse(localStorage.getItem("events") || "[]")
                : []
            } // Initial events loaded from local storage.
          />
        </div>
      </div>

      {/* Dialog for adding new events */}
      {/* <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Event Details</DialogTitle>
          </DialogHeader>
          <form className="space-x-5 mb-4" onSubmit={handleAddEvent}>
            <input
              type="text"
              placeholder="Event Title"
              value={newEventTitle}
              onChange={(e) => setNewEventTitle(e.target.value)} // Update new event title as the user types.
              required
              className="border border-gray-200 p-3 rounded-md text-lg"
            />
            <button
              className="p-3 mt-5 rounded-md"
              type="submit"
            >
              Add
            </button>{" "}
          </form>
        </DialogContent>
      </Dialog> */}
    </div>
  );
};

export default UserCalendars; // Export the Calendar component for use in other parts of the application.