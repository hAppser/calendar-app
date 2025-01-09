export const getStartOfWeek = (date: Date, startDay: number = 0): Date => {
  const dayOfWeek = date.getDay();
  const diff = (dayOfWeek < startDay ? 7 : 0) + dayOfWeek - startDay;
  const startOfWeek = new Date(date);
  startOfWeek.setDate(date.getDate() - diff);
  return startOfWeek;
};

export const generateMonthDays = (currentDate: Date): Date[] => {
  const firstDay = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1,
    currentDate.getHours(),
    currentDate.getMinutes()
  );
  const lastDay = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  );
  firstDay.setDate(firstDay.getDate() - firstDay.getDay());

  const days: Date[] = [];
  while (firstDay <= lastDay || firstDay.getDay() !== 0) {
    days.push(new Date(firstDay));
    firstDay.setDate(firstDay.getDate() + 1);
  }
  return days;
};

export const generateWeekDays = (currentDate: Date): Date[] => {
  const startOfWeek = getStartOfWeek(new Date(currentDate));
  startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
  const days: Date[] = [];

  for (let i = 0; i < 7; i++) {
    days.push(new Date(startOfWeek));
    startOfWeek.setDate(startOfWeek.getDate() + 1);
  }
  return days;
};

export const getDayInfo = (day: Date) => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  const dateDay = day.getDate();

  const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const month = day.toLocaleDateString("en-US", { month: "short" });

  const isMonthFirstOrLastDay = dateDay === 1 || dateDay === lastDayOfMonth;
  const isCurrentMonth =
    day.getMonth() >= currentMonth && day.getFullYear() >= currentYear;

  return { isMonthFirstOrLastDay, isCurrentMonth, month, currrentDay: dateDay };
};
