import { COLORS } from "@/constants";
import { LitElement, css, html, unsafeCSS } from "lit";
import { customElement, property, state } from "lit/decorators.js";

type ActiveSection = "minuman" | "makanan";

@customElement("menu-section")
export class Menu extends LitElement {
  @state() activeSection: ActiveSection = "minuman";

  @property() minuman: { name: string }[] = [];
  @property() makanan: { name: string }[] = [];

  _switchSection(section: ActiveSection) {
    this.activeSection = section;

    const menuContent = this.shadowRoot?.querySelector(
      ".section-2__menu-content"
    ) as HTMLElement;
    menuContent?.setAttribute("tabindex", "0");
    menuContent?.focus();
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

  protected createRenderRoot() {
    return this;
  }
}
