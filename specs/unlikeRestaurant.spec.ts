import FavoriteIDB from "@/data/favorite-idb";
import TestFactories from "./helpers/testFactories";
import { clickUnlikeButton } from "./helpers";
import { Restaurant } from "@/types";

describe("Unliking A Restaurant", () => {
  beforeEach(async () => {
    const data: Restaurant = {
      id: "1",
      city: "",
      name: "",
      description: "",
      rating: 0,
      pictureId: "",
    };
    await FavoriteIDB.put(data);
  });

  afterEach(async () => {
    await FavoriteIDB.delete("1");
  });

  it("should display unlike widget when the restaurant has been liked", async () => {
    const element = await TestFactories.createFoodCard({ id: "1" });

    expect(element.querySelector('[title="Hapus dari favorit"]')).toBeTruthy();
  });

  it("should not display like widget when the restaurant has been liked", async () => {
    await TestFactories.createFoodCard({ id: 1 });

    expect(document.querySelector('[title="Tambah ke favorit"]')).toBeFalsy();
  });

  it("should be able to remove liked restaurant from the list", async () => {
    const element = await TestFactories.createFoodCard({ id: 1 });

    clickUnlikeButton(element);

    expect(await FavoriteIDB.getAll()).toEqual([]);
  });

  it("should not throw error if the unliked restaurant is not in the list", async () => {
    const element = await TestFactories.createFoodCard({ id: "1" });

    await FavoriteIDB.delete("1");

    clickUnlikeButton(element);

    expect(await FavoriteIDB.getAll()).toEqual([]);
  });
});
