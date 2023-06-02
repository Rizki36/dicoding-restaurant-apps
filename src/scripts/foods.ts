import data from "@/DATA.json";

// get template
const foodTemplate = document
  .querySelector("#food-template")
  // @ts-ignore - cloneNode() is not a function
  .cloneNode(true).content;

// get food list
const foodList = document.querySelector(".foods__list");

const render = () => {
  data.restaurants.forEach((food) => {
    const foodElement = foodTemplate.cloneNode(true);
    // fill the template with data
    foodElement.querySelector(".foods__item").setAttribute("tabindex", 0);
    foodElement.querySelector(".foods__item-name").textContent = food.name;
    foodElement.querySelector(".foods__item-image img").src = food.pictureId;
    foodElement.querySelector(
      ".foods__item-image img"
    ).alt = `Image of ${food.name} restaurant`;
    foodElement.querySelector(".foods__item-rating span").textContent =
      food.rating;
    foodElement.querySelector(".foods__item-description").textContent =
      food.description;
    foodElement.querySelector(".foods__item-city").textContent = food.city;
    foodList.appendChild(foodElement);
  });
};

render();
