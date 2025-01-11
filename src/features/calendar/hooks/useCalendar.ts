import { useState, useEffect } from "react";
import { generateMonthDays, generateWeekDays } from "../lib/dateUtils";

export const useCalendar = () => {
  const [view, setView] = useState<"month" | "week">("month");
  const [currentDate, setCurrentDate] = useState(new Date());
  const [days, setDays] = useState<Date[]>([]);

  useEffect(() => {
    const updatedDays =
      view === "month"
        ? generateMonthDays(currentDate)
        : generateWeekDays(currentDate);
    setDays(updatedDays);
  }, [view, currentDate]);

  const changeMonth = (increment: number) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + increment);
    setCurrentDate(newDate);
  };

  const changeWeek = (increment: number) => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + increment * 7);
    setCurrentDate(newDate);
  };

  return {
    view,
    setView,
    currentDate,
    setCurrentDate,
    days,
    changeMonth,
    changeWeek,
  };
};
