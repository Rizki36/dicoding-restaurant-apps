import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";

import "@/components/pages/main/hero-section";
import "@/components/pages/main/features-section";
import "@/components/pages/main/foods-section";

@customElement("main-page")
export class MainPage extends LitElement {
  render() {
    return html` <div>
      <hero-section></hero-section>
      <features-section></features-section>
      <foods-section></foods-section>
    </div>`;
  }
}
