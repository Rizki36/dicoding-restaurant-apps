import CONFIG from "@/constants/config";
import { Restaurant } from "@/types";
import { openDB } from "idb";

const dbPromise = openDB(CONFIG.DATABASE_NAME, CONFIG.DATABASE_VERSION, {
  upgrade(database) {
    database.createObjectStore(CONFIG.OBJECT_STORE_NAME, { keyPath: "id" });
  },
});

const FavoriteIDB = {
  async getOne(id: string): Promise<Restaurant> {
    return (await dbPromise).get(CONFIG.OBJECT_STORE_NAME, id);
  },
  async getAll(): Promise<Restaurant[]> {
    return (await dbPromise).getAll(CONFIG.OBJECT_STORE_NAME);
  },
  async put(movie: Restaurant) {
    return (await dbPromise).add(CONFIG.OBJECT_STORE_NAME, movie);
  },
  async update(movie) {
    return (await dbPromise).put(CONFIG.OBJECT_STORE_NAME, movie);
  },
  async delete(id) {
    return (await dbPromise).delete(CONFIG.OBJECT_STORE_NAME, id);
  },
};

export default FavoriteIDB;
