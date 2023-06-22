type SkipContentProps = {
  skipContentEl: HTMLElement;
  mainContentEl: HTMLElement | undefined;
};

class SkipContent {
  private _skipContentEl: HTMLElement;
  private _mainContentEl: HTMLElement | undefined;

  constructor({ skipContentEl, mainContentEl }: SkipContentProps) {
    this._skipContentEl = skipContentEl;
    this._mainContentEl = mainContentEl;

    this._init();
  }

  private _init() {
    this._addEventListeners();
  }

  private _addEventListeners() {
    if (!this._skipContentEl) return;

    this._skipContentEl.addEventListener("click", () => {
      this._onSkipContent();
    });
  }

  private _onSkipContent() {
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
