import React, { useState, useEffect } from "react";
import * as Styled from "./Calendar.styles";
import { fetchHolidays } from "../../shared/api/holidaysApi";
import {
  generateMonthDays,
  generateWeekDays,
  getDayInfo,
  getStartOfWeek,
} from "./lib/dateUtils";
import { Button } from "../../shared/ui/Button";
import TaskList from "../tasks/ui/TaskList";
import useTasks from "../tasks/useTasks";

const Calendar: React.FC = () => {
  const { tasks, addTask } = useTasks();
  const [view, setView] = useState<"month" | "week">("month");
  const [currentDate, setCurrentDate] = useState(new Date());
  const [days, setDays] = useState<Date[]>([]);
  const [holidays, setHolidays] = useState<Record<string, string>>({});
  useEffect(() => {
    const loadHolidays = async () => {
      const data = await fetchHolidays();
      setHolidays(data);
    };
    loadHolidays();
  }, [currentDate]);

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

  return (
    <Styled.CalendarContainer>
      <>
        <Styled.Controls side="end">
          <Button onClick={() => setView("month")}>Month</Button>
          <Button onClick={() => setView("week")}>Week</Button>
        </Styled.Controls>
        <Styled.Flex side="center">
          {view === "month" ? (
            <Styled.Controls>
              <Button onClick={() => changeMonth(-1)}>Prev Month</Button>
              <span>
                {currentDate.toLocaleDateString("en-US", {
                  month: "long",
                  year: "numeric",
                })}
              </span>
              <Button onClick={() => changeMonth(1)}>Next Month</Button>
            </Styled.Controls>
          ) : (
            <Styled.Controls>
              <Button onClick={() => changeWeek(-1)}>Prev Week</Button>
              <span>
                Week of {getStartOfWeek(currentDate).toLocaleDateString()}
              </span>
              <Button onClick={() => changeWeek(1)}>Next Week</Button>
            </Styled.Controls>
          )}
        </Styled.Flex>
      </>
      <Styled.Header>
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <Styled.Weekday key={day}>{day}</Styled.Weekday>
        ))}
      </Styled.Header>
      <Styled.Grid>
        {days.map((day) => {
          const { isMonthFirstOrLastDay, isCurrentMonth, currrentDay } =
            getDayInfo(day);
          const month = day.toLocaleDateString("en-US", {
            month: "short",
          });

          const dayKey = day.toISOString().split("T")[0];
          const dayTasks = tasks[dayKey] || [];
          return (
            <Styled.Day
              key={dayKey}
              isEmpty={!day}
              isInactive={!isCurrentMonth}
              onClick={() => addTask(dayKey, { id: "1", text: "firstTask" })}
            >
              <Styled.DayNumber>
                {isMonthFirstOrLastDay && month} {currrentDay}
              </Styled.DayNumber>
              <Styled.Tasks>
                <Styled.Weekday>{holidays[dayKey]}</Styled.Weekday>
                <TaskList tasks={dayTasks} />
              </Styled.Tasks>
            </Styled.Day>
          );
        })}
      </Styled.Grid>
    </Styled.CalendarContainer>
  );
};

export default Calendar;
