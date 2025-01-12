import { useEffect, useState } from "react";
import { useTaskDB } from "./useTaskDB";

export type TTask = { id: string; text: string };

export const useTasks = () => {
  const { getAllTasksDB, saveTaskDB, deleteTaskDB } = useTaskDB();
  const [tasks, setTasks] = useState<Record<string, TTask[]>>({});
  useEffect(() => {
    const fetchTasks = async () => {
      const allTasks = await getAllTasksDB();
      const groupedTasks = groupTasksByDay(allTasks);
      setTasks(groupedTasks);
    };
    fetchTasks();
  }, []);

  const groupTasksByDay = (
    allDays: { dayKey: string; tasks: TTask[] }[]
  ): Record<string, TTask[]> => {
    return allDays.reduce((acc, day) => {
      acc[day.dayKey] = day.tasks;
      return acc;
    }, {} as Record<string, TTask[]>);
  };

  const addTask = (dayKey: string, task: TTask) => {
    setTasks((prev) => {
      const updatedTasks = { ...prev };
      if (!updatedTasks[dayKey]) {
        updatedTasks[dayKey] = [];
      }
      const isDuplicate = updatedTasks[dayKey].some((t) => t.id === task.id);

      if (!isDuplicate) {
        updatedTasks[dayKey].push(task);
      }

      saveTaskDB(dayKey, task);
      return updatedTasks;
    });
  };

  const editTask = (taskId: string, newText: string) => {
    setTasks((prev) => {
      const updatedTasks = { ...prev };
      for (const dayKey in updatedTasks) {
        const dayTasks = updatedTasks[dayKey];
        const taskIndex = dayTasks.findIndex((task) => task.id === taskId);
        if (taskIndex !== -1) {
          dayTasks[taskIndex].text = newText;
          saveTaskDB(dayKey, dayTasks[taskIndex]);
          break;
        }
      }
      return updatedTasks;
    });
  };

  const deleteTask = (taskId: string) => {
    setTasks((prev) => {
      const updatedTasks = { ...prev };
      for (const dayKey in updatedTasks) {
        const dayTasks = updatedTasks[dayKey];
        const taskIndex = dayTasks.findIndex((task) => task.id === taskId);
        if (taskIndex !== -1) {
          dayTasks.splice(taskIndex, 1);
          deleteTaskDB(dayKey, taskId);
          break;
        }
      }
      return updatedTasks;
    });
  };

  const moveTask = (
    taskId: string,
    sourceDayKey: string,
    destinationDayKey: string
  ) => {
    setTasks((prev) => {
      const updatedTasks = { ...prev };

      const sourceTasks = updatedTasks[sourceDayKey] || [];
      const [taskToMove] = sourceTasks.splice(
        sourceTasks.findIndex((task) => task.id === taskId),
        1
      );
      updatedTasks[sourceDayKey] = sourceTasks;

      if (!updatedTasks[destinationDayKey]) {
        updatedTasks[destinationDayKey] = [];
      }
      updatedTasks[destinationDayKey].push(taskToMove);

      deleteTaskDB(sourceDayKey, taskId);
      saveTaskDB(destinationDayKey, taskToMove);

      return updatedTasks;
    });
  };

  return { tasks, addTask, editTask, deleteTask, moveTask };
};
