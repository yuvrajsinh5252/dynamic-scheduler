const daysMap: { [key: string]: number } = {
  Sunday: 0,
  Monday: 1,
  Tuesday: 2,
  Wednesday: 3,
  Thursday: 4,
  Friday: 5,
  Saturday: 6,
};

function checkDayOverlap(
  admin_start: number,
  admin_end: number,
  user_day: number
) {
  if (admin_start <= user_day && admin_end >= user_day) return true;
  else return false;
}

function checkTimeOverlap(
  admin_start: any,
  admin_end: any,
  user_start: any,
  user_end: any
) {
  if (admin_start <= user_start && admin_end >= user_end) return true;
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
    const adminStartDateObj = new Date(admin_start_date);
    const adminEndDateObj = new Date(admin_end_date);

    const adminStartDay = adminStartDateObj.getDay();
    const adminEndDay = adminEndDateObj.getDay();

    console.log(user_schdule);

    user_schdule.forEach((element: any) => {
      element.days.forEach((day: any) => {
        if (day.enabled) {
          const userDay = daysMap[day.day];

          if (
            checkDayOverlap(adminStartDay, adminEndDay, userDay) ||
            checkTimeOverlap(admin_start_time, admin_end_time, day.from, day.to)
          ) {
            return false;
          }
        }
      });
    });

    return true;
  }
}
