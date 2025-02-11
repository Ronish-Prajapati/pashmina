import { openDB } from "idb";

const dbName = "registrationFormDB";
const storeName = "registrations";

export const initDB = async () => {
  return openDB(dbName, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(storeName)) {
        db.createObjectStore(storeName, { keyPath: "id", autoIncrement: true });
      }
    },
  });
};

export const addToDB = async (data) => {
  const db = await initDB();
  await db.add(storeName, data);
};

export const getAllFromDB = async () => {
  const db = await initDB();
  return db.getAll(storeName);
};

export const clearDB = async () => {
  const db = await initDB();
  await db.clear(storeName);
};
