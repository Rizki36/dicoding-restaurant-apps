import { COLORS } from "@/constants";
import { LitElement, css, html, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";

type ActiveSection = "minuman" | "makanan";

@customElement("menu-section")
export class Menu extends LitElement {
  @property() activeSection: ActiveSection = "minuman";

  @property() minuman: { name: string }[] = [];
  @property() makanan: { name: string }[] = [];

  _switchSection(section: ActiveSection) {
    this.activeSection = section;
  }

  render() {
    return html`
      <div class="section-2__menu">
        <button
          class="section-2__menu-item ${this.activeSection === "minuman"
            ? "active"
            : ""}"
          @click=${() => this._switchSection("minuman")}
          type="button"
        >
          Minuman
        </button>
        <button
          class="section-2__menu-item ${this.activeSection === "makanan"
            ? "active"
            : ""}"
          @click=${() => this._switchSection("makanan")}
          type="button"
        >
          Makanan
        </button>
        <div class="section-2__menu-content">
          ${this.activeSection === "minuman"
            ? html`<ul>
                ${this.minuman.map((menu) => html`<li>${menu.name}</li>`)}
              </ul>`
            : html`<ul>
                ${this.makanan.map((menu) => html`<li>${menu.name}</li>`)}
              </ul>`}
        </div>
      </div>
    `;
  }

  static styles = css`
    * {
      box-sizing: border-box;
    }
    .section-2__menu {
      margin-top: 24px;
    }
    .section-2__menu-item {
      background-color: transparent;
      border: none;
      font-size: 16px;
      font-weight: bold;
      padding: 16px 0;
      padding-bottom: 8px;
      margin-right: 24px;
      cursor: pointer;
      border-bottom: 5px solid transparent;
      margin-bottom: 24px;
    }
    .section-2__menu-item.active {
      border-bottom: 5px solid ${unsafeCSS(COLORS.primary)};
    }

    .section-2__menu-content ul {
      padding-inline-start: 16px;
      margin-block-start: 0;
      margin-block-end: 0;
    }
  `;
}
