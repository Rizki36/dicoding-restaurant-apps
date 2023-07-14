const TestFactories = {
  createFoodCard: async (restaurant) => {
    await import("@/components/shared/food-card");
    document.body.innerHTML = `
              <food-card
                id="${restaurant.id}"
                name="${restaurant.name}"
                description="${restaurant.description}"
                city="${restaurant.city}"
                rating="${restaurant.rating}"
                pictureId="${restaurant.pictureId}"
              ></food-card>
          `;

    // wait for component to be rendered
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return document.querySelector("food-card");
  },
};

export default TestFactories;
