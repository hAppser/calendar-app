import { openDB } from "idb";
import { TTask } from "./useTasks";

const DB_NAME = "CalendarTasksDB";
const STORE_NAME = "tasks";

export const useTaskDB = () => {
  const getDB = async () => {
    return openDB(DB_NAME, 1, {
      upgrade(db) {
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME, { keyPath: "dayKey" });
        }
      },
    });
  };

  const saveTaskDB = async (dayKey: string, task: TTask) => {
    const db = await getDB();
    let existingTasks = await db.get(STORE_NAME, dayKey);

    if (!existingTasks) {
      existingTasks = { dayKey, tasks: [] };
    }

    const taskIndex = existingTasks.tasks.findIndex(
      (t: { id: string }) => t.id === task.id
    );
    if (taskIndex !== -1) {
      existingTasks.tasks[taskIndex] = task;
    } else {
      existingTasks.tasks.push(task);
    }

    await db.put(STORE_NAME, { dayKey, tasks: existingTasks.tasks });
  };

  const getTasksByDayDB = async (dayKey: string) => {
    const db = await getDB();
    return (await db.get(STORE_NAME, dayKey)) || [];
  };

  const deleteTaskDB = async (dayKey: string, taskId: string) => {
    const db = await getDB();
    const days = await db.get(STORE_NAME, dayKey);

    if (!days) {
      return;
    }

    const updatedTasks = days.tasks.filter((task: TTask) => task.id !== taskId);

    if (updatedTasks.length === 0) {
      await db.delete(STORE_NAME, dayKey);
    } else {
      await db.put(STORE_NAME, { dayKey, tasks: updatedTasks });
    }
  };

  const getAllTasksDB = async () => {
    const db = await getDB();
    const allTasks = await db.getAll(STORE_NAME);
    return allTasks.flat(Infinity);
  };

  return { saveTaskDB, getTasksByDayDB, deleteTaskDB, getAllTasksDB };
};
