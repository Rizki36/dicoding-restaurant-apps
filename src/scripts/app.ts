import NavigationInitiator from "@/utils/navigation-initiator";
import UrlParser from "../utils/url-parser";
import routes from "./routes";
import SkipContent from "@/utils/skip-content";
import { SKIP_CONTENT_TARGET } from "@/constants";

type AppProps = {
  navBtnOpenEl: HTMLElement;
  navBtnCloseEl: HTMLElement;
  navEl: HTMLElement;
  skipContentEl: HTMLElement;
  content: HTMLElement;
};

class App {
  private _navBtnOpenEl: HTMLElement;
  private _navBtnCloseEl: HTMLElement;
  private _navEl: HTMLElement;
  private _content: HTMLElement;
  private _skipContentEl: HTMLElement;

  constructor({
    navBtnOpenEl,
    navBtnCloseEl,
    navEl,
    content,
    skipContentEl,
  }: AppProps) {
    this._navBtnOpenEl = navBtnOpenEl;
    this._navBtnCloseEl = navBtnCloseEl;
    this._navEl = navEl;
    this._skipContentEl = skipContentEl;
    this._content = content;

    this._initAppShell();
  }

  private _initAppShell() {
    new NavigationInitiator({
      btnOpenEl: this._navBtnOpenEl,
      btnCloseEl: this._navBtnCloseEl,
      navEl: this._navEl,
    });
  }

  async renderPage() {
    const url = UrlParser.parseActiveUrlWithCombiner();
    const page = routes[url];
    this._content.innerHTML = await page.renderPage();
  }

  async afterRenderPage() {
    const mainContentEl = document.getElementById(
      SKIP_CONTENT_TARGET
    ) as HTMLElement;

    new SkipContent({
      skipContentEl: this._skipContentEl,
      mainContentEl,
    });
  }
}

export default App;
