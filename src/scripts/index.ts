import "regenerator-runtime"; /* for async await transpile */
import "../styles/main.scss";
import App from "@/scripts/app";
import swRegister from "@/utils/sw-register";

const app = new App({
  navBtnCloseEl: document.querySelector(".btn-close"),
  navBtnOpenEl: document.querySelector(".btn-open"),
  navEl: document.querySelector(".nav"),
  content: document.querySelector("#content"),
});

window.addEventListener("hashchange", async () => {
  await app.renderPage();
  await app.afterRenderPage();

  // reset scroll position
  window.scrollTo(0, 0);
});

window.addEventListener("load", async () => {
  await app.renderPage();
  await app.afterRenderPage();
  swRegister();

  // remove loading-portal
  const loadingPortalEl = document.querySelector("#loading-portal");
  loadingPortalEl?.remove();
});
