import { AddReviewData, RestaurantDetail } from "@/types";

const RestaurantSource = {
  getRestaurantList: async () => {
    const response = await fetch("https://restaurant-api.dicoding.dev/list");
    const json = await response.json();
    return json.restaurants as RestaurantDetail[];
  },
  getRestaurantDetail: async (id: string) => {
    const response = await fetch(
      `https://restaurant-api.dicoding.dev/detail/${id}`
    );
    const json = await response.json();
    return json.restaurant as RestaurantDetail;
  },
  postAddReview: async (payload: AddReviewData) => {
    return fetch("https://restaurant-api.dicoding.dev/review", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
  },
};

export default RestaurantSource;
