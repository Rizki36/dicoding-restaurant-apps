import assert from "assert";

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

  const firstRestaurant = locate("food-card").first();
  const firstRestaurantTitle = await I.grabTextFrom(
    firstRestaurant.find(".foods__item-name")
  );
  const likeButton = firstRestaurant.find(".foods__add-to-favorite");

  I.click(likeButton);
  I.amOnPage("/#/favorite");
  I.seeElement("food-card");

  const likedRestaurantTitle = await I.grabTextFrom(".foods__item-name");

  assert.strictEqual(firstRestaurantTitle, likedRestaurantTitle);
});

Scenario("searching restaurant", async ({ I }) => {
  I.see(
    "Kamu belum menambahkan restaurant ke favorite",
    ".favorite-page__empty__title"
  );
  I.amOnPage("/");
  I.seeElement("foods-section");

  const titles = [];

  for (let i = 1; i <= 3; i++) {
    const restaurant = locate("food-card").at(i);
    I.click(restaurant.find(".foods__add-to-favorite"));
    titles.push(await I.grabTextFrom(restaurant.find(".foods__item-name")));
  }

  I.amOnPage("/#/favorite");

  const searchQuery = titles[1].substring(1, 3);
  const matchingRestaurant = titles.filter(
    (title) => title.indexOf(searchQuery) !== -1
  );

  I.fillField("#query", searchQuery);

  const visibleLikedRestaurants = await I.grabNumberOfVisibleElements(
    "food-card"
  );
  assert.strictEqual(matchingRestaurant.length, visibleLikedRestaurants);

  matchingRestaurant.forEach(async (title, index) => {
    const visibleTitle = await I.grabTextFrom(
      locate(".foods__item-name").at(index + 1)
    );
    assert.strictEqual(title, visibleTitle);
  });
});
