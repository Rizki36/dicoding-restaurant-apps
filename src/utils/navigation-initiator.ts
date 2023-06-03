class NavigationInitiator {
  private _btnOpenEl: Element;
  private _btnCloseEl: Element;
  private _navEl: Element;

  constructor({ btnOpenEl, btnCloseEl, navEl }) {
    this._btnOpenEl = btnOpenEl;
    this._btnCloseEl = btnCloseEl;
    this._navEl = navEl;

    this.init();
  }

  private init() {
    this.addEventListeners();
  }

  private addEventListeners() {
    this._btnOpenEl.addEventListener("click", () => {
      this.onOpenNav();
    });

    this._btnCloseEl.addEventListener("click", () => {
      this.onCloseNav();
    });

    window.addEventListener("scroll", () => {
      this.onScrollNav();
    });
  }

  private onOpenNav() {
    document.body.classList.toggle("nav-open");
    // disable scroll
    document.body.style.overflow = "hidden";
  }

  private onCloseNav() {
    document.body.classList.toggle("nav-open");
    // enable scroll
    document.body.style.overflow = "auto";
  }

  /**
   * Add background color to nav on scroll for mobile
   */
  private onScrollNav() {
    const scrollHeight = window.pageYOffset;
    const navHeight = this._navEl.getBoundingClientRect().height;

    if (scrollHeight > navHeight) {
      this._navEl.classList.add("nav-scroll");
    } else {
      this._navEl.classList.remove("nav-scroll");
    }
  }
}

export default NavigationInitiator;
