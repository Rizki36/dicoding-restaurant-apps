const btnOpenEl = document.querySelector(".btn-open");
const btnCloseEl = document.querySelector(".btn-close");

btnOpenEl.addEventListener("click", () => {
  document.body.classList.toggle("nav-open");
});

btnCloseEl.addEventListener("click", () => {
  document.body.classList.toggle("nav-open");
});
