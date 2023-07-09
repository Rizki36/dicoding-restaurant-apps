describe("", () => {
  it("", async () => {
    await import("@/components/shared/food-card");

    document.body.innerHTML = `
      <food-card></food-card>
    `;

    expect(document.querySelector("food-card")).not.toBeNull();
  });
});
