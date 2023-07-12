Feature("Liking Restaurant");

Before(({ I }) => {
  I.amOnPage("/#/favorite");
});

Scenario("showing empty liked restaurant", ({ I }) => {
  I.see(
    "Kamu belum menambahkan restaurant ke favorite",
    ".favorite-page__empty__title"
  );
});

Scenario("liking one restaurant", async ({ I }) => {
  I.see(
    "Kamu belum menambahkan restaurant ke favorite",
    ".favorite-page__empty__title"
  );

  I.amOnPage("/");

  I.seeElement("foods-section");

  const firstRestaurant = locate({
    shadow: ["foods-section", "food-card", ".foods__item-name"],
  }).first();
  // const firstRestaurant = locate(".foods__item-name").first();
  const firstRestaurantTitle = await I.grabTextFrom(firstRestaurant);
  console.log(firstRestaurantTitle);
});
