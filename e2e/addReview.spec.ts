import assert from "assert";

Feature("Add Review Restaurant");

Before(({ I }) => {
  I.amOnPage("/");
});

Scenario("Add review restaurant", async ({ I }) => {
  I.seeElement("section#foods");

  const firstRestaurant = locate("food-card").first();
  const detailLink = await I.grabAttributeFrom(
    firstRestaurant.find("[data-testid='food-detail-link']"),
    "href"
  );

  I.click(firstRestaurant);
  I.amOnPage(detailLink);

  /** Disabled because response from API is not consistent */
  //   const reviewItems = await I.grabNumberOfVisibleElements("review-item");
  //   I.seeElement(".section-3__add-review");
  //   I.fillField("input#name", "John Doe");
  //   I.fillField("textarea#review", "Lorem ipsum dolor sit amet");
  //   I.click("button[type=submit]");
  //   I.wait(2);
  //   const newReviewItems = await I.grabNumberOfVisibleElements("review-item");
  //   assert.strictEqual(reviewItems + 1, newReviewItems);

  const name = "John Doe";
  const review = "Lorem ipsum dolor sit amet";
  I.seeElement(".section-3__add-review");
  I.fillField("input#name", name);
  I.fillField("textarea#review", review);
  I.click("button[type=submit]");
  I.wait(2);

  const lastReview = locate("review-item").last();
  const lastReviewName = await I.grabTextFrom(
    lastReview.find(".section-3__reviewer-name")
  );
  const lastReviewText = await I.grabTextFrom(
    lastReview.find(".section-3__review")
  );
  assert.strictEqual(lastReviewName, name);
  assert.strictEqual(lastReviewText, review);
});
