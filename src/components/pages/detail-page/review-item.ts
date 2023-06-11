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

  static styles = css`
    .section-3__review-item {
      display: flex;
      column-gap: 12px;
      border-bottom: 1px solid #eeeeee;
      padding-bottom: 12px;
      margin-bottom: 12px;
    }
    .section-3__reviewer-image {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      background-color: #eeeeee;
    }
    .section-3__reviewer-name {
      font-weight: bold;
    }
    .section-3__reviewed-at {
      font-size: 12px;
      margin-bottom: 8px;
    }
  `;
}
