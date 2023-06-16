import { Food } from "@/types";
import { openDB } from "idb";

const STORE_NAME = "favorite";
const OBJECT_STORE_NAME = "restaurant";

const dbPromise = openDB(STORE_NAME, 1, {
  upgrade(database) {
    database.createObjectStore(OBJECT_STORE_NAME, { keyPath: "id" });
  },
});

const FavoriteIDB = {
  async getOne(id: string): Promise<Food> {
    return (await dbPromise).get(OBJECT_STORE_NAME, id);
  },
  async getAll(): Promise<Food[]> {
    return (await dbPromise).getAll(OBJECT_STORE_NAME);
  },
  async put(movie: Food) {
    return (await dbPromise).add(OBJECT_STORE_NAME, movie);
  },
  async update(movie) {
    return (await dbPromise).put(OBJECT_STORE_NAME, movie);
  },
  async delete(id) {
    return (await dbPromise).delete(OBJECT_STORE_NAME, id);
  },
};

export default FavoriteIDB;
