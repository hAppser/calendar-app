import { useState } from "react";
import { TTask } from "../../../tasks/useTasks";
import * as Styled from "../Calendar.styles";
import { DayCell } from "./DayCell";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";

interface DaysGridProps {
  days: Date[];
  tasks: Record<string, TTask[]>;
  holidays: Record<string, string>;
  addTask: (dayKey: string, task: TTask) => void;
  editTask: (taskId: string, newText: string) => void;
  deleteTask: (taskId: string) => void;
  moveTask: (
    taskId: string,
    sourceDayKey: string,
    destinationDayKey: string,
    sourceIndex: number,
    destinationIndex: number
  ) => void;
}

export const DaysGrid: React.FC<DaysGridProps> = ({
  days,
  tasks,
  holidays,
  addTask,
  editTask,
  deleteTask,
  moveTask,
}) => {
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [searchText, setSearchText] = useState<string>("");

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  const filterTasks = (taskList: TTask[]) => {
    if (!searchText) return taskList;
    return taskList.filter((task) =>
      task.text.toLowerCase().includes(searchText.toLowerCase())
    );
  };

  const handleCellClick = (dayKey: string) => {
    const newTask: TTask = {
      id: `${Date.now()}`,
      text: "",
    };
    addTask(dayKey, newTask);
    setEditingTaskId(newTask.id);
  };

  const handleTaskSave = (taskId: string, newText: string) => {
    editTask(taskId, newText);
    setEditingTaskId(null);
  };

  const handleTaskDelete = (taskId: string) => {
    deleteTask(taskId);
  };

  const onDragEnd = (result: DropResult) => {
    const { source, destination, draggableId } = result;

    if (!destination) return;

    const fromDay = source.droppableId;
    const toDay = destination.droppableId;
    const sourceIndex = source.index;
    const destinationIndex = destination.index;

    moveTask(draggableId, fromDay, toDay, sourceIndex, destinationIndex);
  };

  return (
    <>
      <Styled.SearchBar>
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchText}
          onChange={handleSearch}
        />
      </Styled.SearchBar>
      <DragDropContext onDragEnd={onDragEnd}>
        <Styled.Grid>
          {days.map((day) => {
            const dayKey = day.toISOString().split("T")[0];
            const dayTasks = tasks[dayKey] || [];
            const filteredTasks = filterTasks(dayTasks);
            return (
              <Droppable key={dayKey} droppableId={dayKey}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    style={{ minHeight: "150px" }}
                  >
                    <DayCell
                      key={dayKey}
                      day={day}
                      tasks={filteredTasks}
                      holidays={holidays[dayKey]}
                      dayKey={dayKey}
                      editingTaskId={editingTaskId}
                      onClick={() => handleCellClick(dayKey)}
                      onTaskEdit={(id, newText) => handleTaskSave(id, newText)}
                      onTaskDelete={(id) => handleTaskDelete(id)}
                      onStartEditing={(id) => setEditingTaskId(id)}
                    />
                  </div>
                )}
              </Droppable>
            );
          })}
        </Styled.Grid>
      </DragDropContext>
    </>
  );
};
