import NavigationInitiator from "@/utils/navigation-initiator";

class App {
  private _navBtnOpenEl: Element;
  private _navBtnCloseEl: Element;
  private _navEl: Element;

  constructor({ navBtnOpenEl, navBtnCloseEl, navEl }) {
    this._navBtnOpenEl = navBtnOpenEl;
    this._navBtnCloseEl = navBtnCloseEl;
    this._navEl = navEl;

    this._initAppShell();
  }

  private _initAppShell() {
    new NavigationInitiator({
      btnOpenEl: this._navBtnOpenEl,
      btnCloseEl: this._navBtnCloseEl,
      navEl: this._navEl,
    });
  }
}

export default App;
