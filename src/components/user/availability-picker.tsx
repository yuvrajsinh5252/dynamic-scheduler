import React from "react";
import { Input } from "../ui/input";

const AvailabilityPicker = ({
  setAvailability,
  availability,
}: {
  setAvailability: React.Dispatch<React.SetStateAction<Record<string, DayAvailability>>>;
  availability: Record<string, DayAvailability>;
}) => {
  const daysOfWeek: string[] = [
    "Sunday", "Monday", "Tuesday", "Wednesday",
    "Thursday", "Friday", "Saturday"
  ];

  const toggleDay = (day: string) => {
    setAvailability((prevAvailability) => ({
      ...prevAvailability,
      [day]: {
        ...prevAvailability[day],
        enabled: !prevAvailability[day].enabled,
      },
    }));
  };

  return (
    <div className="availability-picker w-full p-6 rounded-lg shadow-lg space-y-6">
      {daysOfWeek.map((day) => (
        <div key={day} className="day-row flex items-center space-x-4">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={availability[day].enabled}
              onChange={() => toggleDay(day)}
              className="h-4 w-4 text-blue-600 rounded border-gray-600"
            />
            <span className="capitalize">{day}</span>
          </label>
          {availability[day].enabled && (
            <div className="flex items-center space-x-2">
              <Input
                type="time"
                value={availability[day].from}
                onChange={(e) =>
                  setAvailability((prevAvailability) => ({
                    ...prevAvailability,
                    [day]: {
                      ...prevAvailability[day],
                      from: e.target.value,
                    },
                  }))
                }
              />
              <span>-</span>
              <Input
                type="time"
                value={availability[day].to}
                onChange={(e) =>
                  setAvailability((prevAvailability) => ({
                    ...prevAvailability,
                    [day]: {
                      ...prevAvailability[day],
                      to: e.target.value,
                    },
                  }))
                }
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default AvailabilityPicker;
