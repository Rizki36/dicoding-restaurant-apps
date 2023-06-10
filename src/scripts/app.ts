import NavigationInitiator from "@/utils/navigation-initiator";
import { Router } from "@vaadin/router";

type AppProps = {
  navBtnOpenEl: Element;
  navBtnCloseEl: Element;
  navEl: Element;
  content: Element;
};

class App {
  private _navBtnOpenEl: Element;
  private _navBtnCloseEl: Element;
  private _navEl: Element;
  private _content: Element;

  constructor({ navBtnOpenEl, navBtnCloseEl, navEl, content }: AppProps) {
    this._navBtnOpenEl = navBtnOpenEl;
    this._navBtnCloseEl = navBtnCloseEl;
    this._navEl = navEl;
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
    const router = new Router(this._content);

    router.setRoutes([
      {
        path: "/",
        component: "main-page",
        // @ts-ignore - fix this
        action: () => import("@/components/pages/main"),
      },
      {
        path: "/detail",
        component: "detail-page",
        // @ts-ignore - fix this
        action: () => import("@/components/pages/detail-page"),
      },
    ]);

    return router;
  }
}

export default App;
