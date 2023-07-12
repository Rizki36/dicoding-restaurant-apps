import assert from "assert";

Feature("Skip Content");

Before(({ I }) => {
  I.amOnPage("/");
});

const getScrollPosition = async (I) => {
  return await I.executeScript(() => {
    return window.scrollY || window.pageYOffset;
  });
};

Scenario("scroll to x", async ({ I }) => {
  const scrollPosition = await getScrollPosition(I);

  I.pressKey("Tab");
  I.seeElement("#skip-content");
  I.pressKey("Enter");

  const newScrollPosition = await getScrollPosition(I);

  assert.notStrictEqual(scrollPosition, newScrollPosition);
});
