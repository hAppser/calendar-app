import { useState } from "react";

export type TTask = { id: string; text: string };

const useTasks = () => {
  const [tasks, setTasks] = useState<Record<string, TTask[]>>({});

  const addTask = (day: string, task: TTask) => {
    setTasks((prev) => ({
      ...prev,
      [day]: [...(prev[day] || []), task],
    }));
  };

  return { tasks, addTask };
};

export default useTasks;
