import { useTasks } from "../../tasks/useTasks";
import { useHolidays } from "../../../shared/hooks/useHolidays";
import { useCalendar } from "../hooks/useCalendar";
import { ViewSwitcher } from "./components/ViewSwitcher";
import { DateNavigator } from "./components/DateNavigator";
import { WEEKDAYS } from "../../../shared/lib/consts";
import { CalendarContainer, Header, Weekday } from "./Calendar.styles";
import { DaysGrid } from "./components/DaysGrid";

const Calendar: React.FC = () => {
  const { tasks, addTask, editTask, deleteTask, moveTask } = useTasks();
  const { view, setView, currentDate, days, changeMonth, changeWeek } =
    useCalendar();
  const holidays = useHolidays(currentDate.getFullYear());

  return (
    <CalendarContainer>
      <ViewSwitcher view={view} setView={setView} />
      <DateNavigator
        view={view}
        currentDate={currentDate}
        changeMonth={changeMonth}
        changeWeek={changeWeek}
      />
      <Header>
        {WEEKDAYS.map((day) => (
          <Weekday key={day}>{day}</Weekday>
        ))}
      </Header>
      <DaysGrid
        days={days}
        tasks={tasks}
        holidays={holidays}
        addTask={addTask}
        editTask={editTask}
        deleteTask={deleteTask}
        moveTask={moveTask}
      />
    </CalendarContainer>
  );
};

export default Calendar;
