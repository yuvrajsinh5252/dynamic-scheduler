import React, { useState } from "react";
import { Input } from "../ui/input";

type TimeRange = {
  from: string;
  to: string;
};

type DayAvailability = {
  enabled: boolean;
  timeRanges: TimeRange[];
};

const AvailabilityPicker: React.FC = () => {
  const daysOfWeek: string[] = [
    "Sunday", "Monday", "Tuesday", "Wednesday",
    "Thursday", "Friday", "Saturday"
  ];

  const [availability, setAvailability] = useState<Record<string, DayAvailability>>(
    daysOfWeek.reduce((acc, day) => {
      acc[day] = {
        enabled: false,
        timeRanges: [{ from: "09:00", to: "17:00" }],
      };
      return acc;
    }, {} as Record<string, DayAvailability>)
  );

  const toggleDay = (day: string) => {
    setAvailability((prevAvailability) => ({
      ...prevAvailability,
      [day]: {
        ...prevAvailability[day],
        enabled: !prevAvailability[day].enabled,
      },
    }));
  };

  const handleTimeChange = (
    day: string,
    index: number,
    field: keyof TimeRange,
    value: string
  ) => {
    setAvailability((prevAvailability) => {
      const newTimeRanges = [...prevAvailability[day].timeRanges];
      newTimeRanges[index] = { ...newTimeRanges[index], [field]: value };

      return {
        ...prevAvailability,
        [day]: {
          ...prevAvailability[day],
          timeRanges: newTimeRanges,
        },
      };
    });
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
          {availability[day].enabled &&
            availability[day].timeRanges.map((range, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Input
                  type="time"
                  value={range.from}
                  onChange={(e) =>
                    handleTimeChange(day, index, "from", e.target.value)
                  }
                />
                <span>-</span>
                <Input
                  type="time"
                  value={range.to}
                  onChange={(e) =>
                    handleTimeChange(day, index, "to", e.target.value)
                  }
                />
              </div>
            ))}
        </div>
      ))}
    </div>
  );
};

export default AvailabilityPicker;
