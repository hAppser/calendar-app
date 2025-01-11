import { openDB } from "idb";
import { TTask } from "./useTasks";

const DB_NAME = "CalendarTasksDB";
const STORE_NAME = "tasks";

export const useTaskDB = () => {
  const getDB = async () => {
    return openDB(DB_NAME, 1, {
      upgrade(db) {
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME, { keyPath: "id" });
        }
      },
    });
  };

  const saveTaskDB = async (task: TTask) => {
    const db = await getDB();
    await db.put(STORE_NAME, task);
  };

  const getTasksByDayDB = async (dayKey: string) => {
    const db = await getDB();
    const allTasks = await db.getAll(STORE_NAME);
    return allTasks.filter((task) => task.dayKey === dayKey);
  };

  const deleteTaskDB = async (taskId: string) => {
    const db = await getDB();
    await db.delete(STORE_NAME, taskId);
  };

  const getAllTasksDB = async () => {
    const db = await getDB();
    return db.getAll(STORE_NAME);
  };

  return { saveTaskDB, getTasksByDayDB, deleteTaskDB, getAllTasksDB };
};
