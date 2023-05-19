const btnOpenEl = document.querySelector(".btn-open");
const btnCloseEl = document.querySelector(".btn-close");
const navEl = document.querySelector(".nav");
const navHeight = navEl.getBoundingClientRect().height;

btnOpenEl.addEventListener("click", () => {
  document.body.classList.toggle("nav-open");
  // disable scroll
  document.body.style.overflow = "hidden";
});

btnCloseEl.addEventListener("click", () => {
  document.body.classList.toggle("nav-open");
  // enable scroll
  document.body.style.overflow = "auto";
});

// add background color to nav on scroll for mobile
window.addEventListener("scroll", () => {
  const scrollHeight = window.pageYOffset;

  if (scrollHeight > navHeight) {
    navEl.classList.add("nav-scroll");
  } else {
    navEl.classList.remove("nav-scroll");
  }
});
