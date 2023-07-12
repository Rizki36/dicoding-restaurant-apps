import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("review-item")
export class ReviewItem extends LitElement {
  @property({ type: String }) name = "";
  @property({ type: String }) date = "";
  @property({ type: String }) review = "";

  render() {
    return html`
      <div class="section-3__review-item">
        <div class="section-3__reviewer-image"></div>
        <div>
          <div class="section-3__reviewer-name">${this.name}</div>
          <div class="section-3__reviewed-at">${this.date}</div>
          <div class="section-3__review">${this.review}</div>
        </div>
      </div>
    `;
  }

  protected createRenderRoot() {
    return this;
  }
}
