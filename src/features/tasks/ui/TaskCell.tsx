import { useState } from "react";
import { TTask } from "../useTasks";
import { TaskInput, TaskItem, UsersTaskList } from "./Task.styles";

interface TaskCellProps {
  tasks: TTask[];
  editingTaskId: string | null;
  onEditTask: (taskId: string, newText: string) => void;
  onDeleteTask: (taskId: string) => void;
  onStartEditing: (taskId: string) => void;
}

const TaskCell: React.FC<TaskCellProps> = ({
  tasks,
  editingTaskId,
  onEditTask,
  onDeleteTask,
  onStartEditing,
}) => {
  const [inputValue, setInputValue] = useState("");

  return (
    <UsersTaskList
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      {tasks.map((task) => {
        const isEditing = task.id === editingTaskId;

        return (
          <TaskItem key={task.id}>
            {isEditing ? (
              <TaskInput
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Add task"
              />
            ) : (
              <p>{task.text}</p>
            )}
            <div>
              {isEditing ? (
                <div
                  onClick={() => {
                    onEditTask(task.id, inputValue);
                  }}
                >
                  ✔️
                </div>
              ) : (
                <div onClick={() => onDeleteTask(task.id)}>❌</div>
              )}
              {!isEditing && (
                <div onClick={() => onStartEditing(task.id)}>✏️</div>
              )}
            </div>
          </TaskItem>
        );
      })}
    </UsersTaskList>
  );
};

export default TaskCell;
