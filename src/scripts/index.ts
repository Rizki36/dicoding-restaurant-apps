import "regenerator-runtime"; /* for async await transpile */
import "../styles/main.scss";
import App from "@/scripts/app";

const app = new App({
  navBtnCloseEl: document.querySelector(".btn-close"),
  navBtnOpenEl: document.querySelector(".btn-open"),
  navEl: document.querySelector(".nav"),
  content: document.querySelector("#content"),
});

window.addEventListener("hashchange", () => {
  app.renderPage();
});
window.addEventListener("load", () => {
  app.renderPage();
});
