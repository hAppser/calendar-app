import { useState } from "react";

export type TTask = { id: string; text: string };

export const useTasks = () => {
  const [tasks, setTasks] = useState<Record<string, TTask[]>>({});

  const addTask = (day: string, task: TTask) => {
    setTasks((prev) => ({
      ...prev,
      [day]: [...(prev[day] || []), task],
    }));
  };

  const editTask = (day: string, taskId: string, newText: string) => {
    setTasks((prev) => ({
      ...prev,
      [day]: prev[day].map((task) =>
        task.id === taskId ? { ...task, text: newText } : task
      ),
    }));
  };

  const deleteTask = (day: string, taskId: string) => {
    setTasks((prev) => ({
      ...prev,
      [day]: prev[day].filter((task) => task.id !== taskId),
    }));
  };

  const moveTask = (fromDay: string, toDay: string, taskId: string) => {
    const taskToMove = tasks[fromDay]?.find((task) => task.id === taskId);
    if (!taskToMove) return;

    setTasks((prev) => ({
      ...prev,
      [fromDay]: prev[fromDay].filter((task) => task.id !== taskId),
      [toDay]: [...(prev[toDay] || []), taskToMove],
    }));
  };

  return { tasks, addTask, editTask, deleteTask, moveTask };
};
