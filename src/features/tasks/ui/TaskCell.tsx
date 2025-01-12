import { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
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
  const handleSave = (taskId: string) => {
    onEditTask(taskId, inputValue);
    setInputValue("");
  };

  return (
    <UsersTaskList
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      {tasks.map((task, index) => {
        const isEditing = task.id === editingTaskId;

        return (
          <Draggable key={task.id} draggableId={task.id} index={index}>
            {(provided) => (
              <TaskItem
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
              >
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
                        handleSave(task.id);
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
            )}
          </Draggable>
        );
      })}
    </UsersTaskList>
  );
};

export default TaskCell;
