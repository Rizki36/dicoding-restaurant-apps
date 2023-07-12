import FavoriteIDB from "@/data/favorite-idb";
import TestFactories from "./helpers/testFactories";
import { Restaurant } from "@/types";
import { clickLikeButton } from "./helpers";

describe("Like Restaurant", () => {
  it("should show the like button when the restaurant has not been liked before", async () => {
    const element = await TestFactories.createFoodCard({ id: "1" });
    expect(element.querySelector('[title="Tambah ke favorit"]')).toBeTruthy();
  });

  it("should not show the unlike button when the restaurant has not been liked before", async () => {
    const element = await TestFactories.createFoodCard({ id: "1" });
    expect(element.querySelector('[title="Hapus dari favorit"]')).toBeFalsy();
  });

  it("should be able to like the restaurant", async () => {
    const element = await TestFactories.createFoodCard({ id: "1" });

    clickLikeButton(element);

    const restaurant = await FavoriteIDB.getOne("1");

    expect(restaurant.id).toEqual("1");

    FavoriteIDB.delete("1");
  });

  it("should not add a restaurant again when its already liked", async () => {
    const element = await TestFactories.createFoodCard({ id: "1" });

    const data: Restaurant = {
      id: "1",
      city: "",
      name: "",
      description: "",
      rating: 0,
      pictureId: "",
    };

    await FavoriteIDB.put(data);

    clickLikeButton(element);

    expect(await FavoriteIDB.getAll()).toEqual([data]);

    FavoriteIDB.delete("1");
  });

  it("should not add a restaurant when it has no id", async () => {
    const element = await TestFactories.createFoodCard({});

    clickLikeButton(element);

    expect(await FavoriteIDB.getAll()).toEqual([]);
  });
});
