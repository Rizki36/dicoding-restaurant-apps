import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";

import "@/components/pages/main/hero-section";
import "@/components/pages/main/features-section";
import "@/components/pages/main/foods-section";
import { SKIP_CONTENT_TARGET } from "@/constants";

@customElement("main-page")
export class MainPage extends LitElement {
  protected render() {
    return html`<div class="home-page">
      <hero-section></hero-section>
      <features-section
        id="${SKIP_CONTENT_TARGET}"
        data-scroll-offset="-70"
      ></features-section>
      <foods-section></foods-section>
    </div>`;
  }

  protected createRenderRoot() {
    return this;
  }
}
