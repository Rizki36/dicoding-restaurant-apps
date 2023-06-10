import { COLORS } from "@/constants";
import { LitElement, css, html, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("food-card")
export class FoodCard extends LitElement {
  @property({ type: String }) pictureId = "";
  @property({ type: String }) city = "";
  @property({ type: String }) name = "";
  @property({ type: String }) description = "";
  @property({ type: Number }) rating = 0;

  render() {
    return html`
      <div class="foods__item">
        <div class="foods__item-image">
          <img
            src="https://restaurant-api.dicoding.dev/images/medium/${this
              .pictureId}"
            alt=""
          />
          <span class="foods__item-city">${this.city}</span>
        </div>

        <div class="foods__item-content">
          <h3 class="foods__item-name">${this.name}</h3>
          <div class="foods__item-rating">
            <img src="/images/star-icon.svg" alt="Rating" />
            <span>${this.rating}</span>
          </div>
          <p class="foods__item-description">${this.description}</p>
          <div class="foods__item-buy">
            <a href="/detail">Buy</a>
          </div>
        </div>
      </div>
    `;
  }

  static styles = css`
    * {
      box-sizing: border-box;
    }

    .foods__item {
      position: relative;
      max-width: 282px;
      background-color: #fde9dd;
      border-radius: 16px;
    }
    .foods__item-image {
      height: 145px;
      min-width: 282px;
      padding-left: 16px;
    }
    .foods__item-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 16px;
      border: 7px solid #ae1414;
    }
    .foods__item-image span {
      position: absolute;
      padding: 2px 20px;
      border-radius: 14px;
      background-color: #fff;
      top: 12px;
      right: 12px;
      font-size: 12px;
    }
    .foods__item-content {
      padding: 16px 16px 44px;
    }
    .foods__item-name {
      color: #3a3a3a;
      font-size: 16px;
      font-weight: 800;
      margin-block-start: 0;
      margin-block-end: 0;
    }
    .foods__item-rating {
      display: flex;
      align-items: center;
      column-gap: 4px;
      margin-bottom: 8px;
      margin-top: 4px;
    }
    .foods__item-rating span {
      color: #565251;
      font-size: 16px;
    }
    .foods__item-description {
      font-size: 16px;
      color: #3a3a3a;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      margin-block-start: 0;
      margin-block-end: 0;
    }
    .foods__item-buy {
      bottom: -16px;
      display: grid;
      place-items: center;
      position: absolute;
      left: 0;
      right: 0;
    }
    .foods__item-buy a {
      color: #fff;
      font-size: 16px;
      font-weight: 800;
      border-radius: 42px;
      padding: 10px 20px;
      background-color: ${unsafeCSS(COLORS.primary)};
      display: grid;
      place-items: center;
      min-width: 44px;
      min-height: 44px;
      text-decoration: none;
    }
  `;
}
