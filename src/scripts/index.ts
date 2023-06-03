import "regenerator-runtime"; /* for async await transpile */
import "../styles/main.scss";
import "./foods";
import App from "@/views/app";

const app = new App({
  navBtnCloseEl: document.querySelector(".btn-close"),
  navBtnOpenEl: document.querySelector(".btn-open"),
  navEl: document.querySelector(".nav"),
  content: document.querySelector(".content"), // TODO: add content element
});
