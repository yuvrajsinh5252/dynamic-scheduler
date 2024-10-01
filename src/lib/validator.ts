const daysMap: { [key: string]: number } = {
  Sunday: 0,
  Monday: 1,
  Tuesday: 2,
  Wednesday: 3,
  Thursday: 4,
  Friday: 5,
  Saturday: 6,
};

function convertToNumber(time: string) {
  return parseInt(time.split(":")[0]) * 60 + parseInt(time.split(":")[1]);
}

function checkDayOverlap(
  admin_start: number,
  admin_end: number,
  user_day: number
) {
  if (admin_start <= user_day && admin_end >= user_day) return true;
  else return false;
}

function checkTimeOverlap(
  admin_start: number,
  admin_end: number,
  user_start: number,
  user_end: number
) {
  if (
    (admin_start < user_start && admin_end > user_start) ||
    (admin_start < user_end && admin_end > user_end)
  )
    return true;
  else return false;
}

export function checkValidity(
  admin_start_date: string,
  admin_end_date: string,
  admin_start_time: string,
  admin_end_time: string,
  user_schdule: any
) {
  if (
    admin_start_date != "" &&
    admin_end_date != "" &&
    admin_start_time != "" &&
    admin_end_time != "" &&
    user_schdule
  ) {
    const adminStartDay = parseInt(admin_start_date.split("/")[0]);
    const adminEndDay = parseInt(admin_end_date.split("/")[0]) - 1;

    let done = false;

    user_schdule.forEach((element: any) => {
      element.days.forEach((day: any) => {
        if (day.enabled) {
          const userDay = daysMap[day.day];

          if (
            checkDayOverlap(adminStartDay, adminEndDay, userDay) ||
            checkTimeOverlap(
              convertToNumber(admin_start_time),
              convertToNumber(admin_end_time),
              convertToNumber(day.from),
              convertToNumber(day.to)
            )
          ) {
            done = true;
          }
        }
      });
    });

    return !done;
  }
}
