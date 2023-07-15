import { SKIP_CONTENT_TARGET } from "@/constants";

class SkipContent {
  private _mainContentEl: HTMLElement | undefined;

  constructor() {
    this._init();
  }

  private _init() {
    this._addEventListeners();
  }

  private _addEventListeners() {
    document.addEventListener("click", (e) => {
      // @ts-ignore
      const target = e.target?.closest?.("#skip-content");
      if (target) {
        this._onSkipContent();
      }
    });
  }

  private _onSkipContent() {
    this._mainContentEl = document.getElementById(SKIP_CONTENT_TARGET);
    if (!this._mainContentEl) return;

    this._mainContentEl.setAttribute("tabindex", "-1");
    this._mainContentEl.focus();
    this._scrollToMainContent();
  }

  private _scrollToMainContent() {
    const dataScrollOffset = Number(
      this._mainContentEl.dataset.scrollOffset || 0
    );

    const headerOffset = dataScrollOffset;
    const elementPosition = this._mainContentEl.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  }
}

export default SkipContent;
