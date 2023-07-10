import { Restaurant } from "@/types";
import TestFactories from "./helpers/testFactories";

const restaurant: Restaurant = {
  id: "1",
  city: "Malang",
  name: "Nasi Goreng",
  description:
    "Nasi goreng adalah sebuah makanan yang terbuat dari nasi yang digoreng dan diaduk dalam minyak goreng, margarin atau mentega, biasanya ditambah kecap manis, bawang merah, bawang putih, dan bumbu-bumbu lainnya, seperti telur, ayam, dan kerupuk.",
  rating: 4.5,
  pictureId: "1",
};

describe("Food Card", () => {
  it("should render food card", async () => {
    const element = await TestFactories.createFoodCard(restaurant);
    expect(element).toBeTruthy();
  });

  fit("should render food card with correct data", async () => {
    const element = await TestFactories.createFoodCard(restaurant);
    expect(
      element.querySelector('[data-testid="food-title"]')?.textContent?.trim?.()
    ).toEqual(restaurant.name);

    expect(
      element
        .querySelector("[data-testid='food-description']")
        ?.textContent?.trim?.()
    ).toEqual(restaurant.description);

    expect(
      element.querySelector("[data-testid='food-rating']")?.textContent
    ).toEqual(restaurant.rating.toString());

    expect(
      element.querySelector("[data-testid='food-city']")?.textContent
    ).toEqual(restaurant.city);

    expect(
      element
        .querySelector("[data-testid='food-detail-link']")
        ?.getAttribute("href")
    ).toEqual(`#/detail/${restaurant.id}`);
  });
});
