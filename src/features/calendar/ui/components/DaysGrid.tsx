import { useState } from "react";
import { TaskList } from "../../../tasks/ui/Task.styles";
import TaskCell from "../../../tasks/ui/TaskCell";
import { TTask } from "../../../tasks/useTasks";
import { getDayInfo } from "../../lib/dateUtils";
import * as Styled from "../Calendar.styles";
import { useTaskDB } from "../../../tasks/useTaskDB";

interface DaysGridProps {
  days: Date[];
  tasks: Record<string, TTask[]>;
  holidays: Record<string, string>;
  addTask: (dayKey: string, task: TTask) => void;
  editTask: (dayKey: string, taskId: string, newText: string) => void;
  deleteTask: (dayKey: string, taskId: string) => void;
  moveTask: (fromDay: string, toDay: string, taskId: string) => void;
}

export const DaysGrid: React.FC<DaysGridProps> = ({
  days,
  tasks,
  holidays,
  addTask,
  editTask,
  deleteTask,
}) => {
  const { saveTaskDB, deleteTaskDB } = useTaskDB();
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const handleCellClick = (dayKey: string) => {
    const newTask: TTask = {
      id: `${Date.now()}`,
      text: "",
    };
    addTask(dayKey, newTask);
    setEditingTaskId(newTask.id);
  };

  const handleTaskSave = (dayKey: string, taskId: string, newText: string) => {
    editTask(dayKey, taskId, newText);
    const updatedTask = { id: taskId, text: newText };
    saveTaskDB(updatedTask);
    setEditingTaskId(null);
  };

  const handleTaskDelete = (dayKey: string, taskId: string) => {
    deleteTask(dayKey, taskId);
    deleteTaskDB(taskId);
  };

  return (
    <Styled.Grid>
      {days.map((day) => {
        const { isMonthFirstOrLastDay, isCurrentMonth, currrentDay } =
          getDayInfo(day);
        const dayKey = day.toISOString().split("T")[0];
        const dayTasks = tasks[dayKey] || [];
        return (
          <Styled.Day
            key={dayKey}
            isEmpty={!day}
            isInactive={!isCurrentMonth}
            onClick={() => handleCellClick(dayKey)}
          >
            <Styled.DayNumber>
              {isMonthFirstOrLastDay &&
                day.toLocaleDateString("en-US", { month: "short" })}{" "}
              {currrentDay}
            </Styled.DayNumber>
            <TaskList>
              {holidays[dayKey] && (
                <Styled.Weekday>{holidays[dayKey]}</Styled.Weekday>
              )}
              <TaskCell
                tasks={dayTasks}
                editingTaskId={editingTaskId}
                onEditTask={(id, newText) =>
                  handleTaskSave(dayKey, id, newText)
                }
                onDeleteTask={(id) => handleTaskDelete(dayKey, id)}
                onStartEditing={(id) => setEditingTaskId(id)}
              />
            </TaskList>
          </Styled.Day>
        );
      })}
    </Styled.Grid>
  );
};
