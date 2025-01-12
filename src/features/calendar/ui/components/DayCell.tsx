import { TaskList } from "../../../tasks/ui/Task.styles";
import TaskCell from "../../../tasks/ui/TaskCell";
import { TTask } from "../../../tasks/useTasks";
import { getDayInfo } from "../../lib/dateUtils";
import * as Styled from "../Calendar.styles";

interface DayCellProps {
  day: Date;
  tasks: TTask[];
  holidays: string | undefined;
  dayKey: string;
  editingTaskId: string | null;
  onClick: () => void;
  onTaskEdit: (id: string, newText: string) => void;
  onTaskDelete: (id: string) => void;
  onStartEditing: (id: string) => void;
}

export const DayCell: React.FC<DayCellProps> = ({
  day,
  tasks,
  holidays,
  dayKey,
  editingTaskId,
  onClick,
  onTaskEdit,
  onTaskDelete,
  onStartEditing,
}) => {
  const { isMonthFirstOrLastDay, isCurrentMonth, currentDay } = getDayInfo(day);
  return (
    <Styled.Day
      key={dayKey}
      isEmpty={!day}
      isInactive={!isCurrentMonth}
      onClick={onClick}
    >
      <Styled.DayNumber>
        {isMonthFirstOrLastDay &&
          day.toLocaleDateString("en-US", { month: "short" })}{" "}
        {currentDay}
      </Styled.DayNumber>
      <TaskList>
        {holidays && <Styled.Weekday>{holidays}</Styled.Weekday>}
        <TaskCell
          tasks={tasks}
          editingTaskId={editingTaskId}
          onEditTask={onTaskEdit}
          onDeleteTask={onTaskDelete}
          onStartEditing={onStartEditing}
        />
      </TaskList>
    </Styled.Day>
  );
};
