import "regenerator-runtime"; /* for async await transpile */
import "../styles/main.scss";
import App from "@/views/app";
import "@/views/pages/main-page";

const app = new App({
  navBtnCloseEl: document.querySelector(".btn-close"),
  navBtnOpenEl: document.querySelector(".btn-open"),
  navEl: document.querySelector(".nav"),
  content: document.querySelector(".content"), // TODO: add content element
});
