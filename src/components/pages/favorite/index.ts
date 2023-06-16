import { LitElement, css, html, unsafeCSS } from "lit";
import { customElement, state } from "lit/decorators.js";
import "@/components/shared/food-card";
import { Food } from "@/types";
import FavoriteIDB from "@/utils/favorite-idb";
import { map } from "lit/directives/map.js";
import { COLORS } from "@/constants";

@customElement("favorite-page")
export class FavoritePage extends LitElement {
  @state() foods: Food[] = [];

  connectedCallback() {
    super.connectedCallback();
    this._getList();
  }

  render() {
    return html`<div class="favorite-page">
      <h1 class="favorite-page__title">Your Favorite</h1>
      <div class="favorite-page__content">
        ${map(
          this.foods,
          (restaurant) => html`<food-card
            id=${restaurant.id}
            pictureId=${restaurant.pictureId}
            city=${restaurant.city}
            name=${restaurant.name}
            description=${restaurant.description}
            rating=${restaurant.rating}
          ></food-card> `
        )}
      </div>
    </div>`;
  }

  async _getList() {
    try {
      const foods = await FavoriteIDB.getAll();
      this.foods = foods;
    } catch (error) {
      alert("Gagal mengambil data");
    }
  }

  static styles = css`
    * {
      box-sizing: border-box;
    }

    .favorite-page {
      margin-top: 118px;
      padding: 0 20px;
      min-height: 90vh;
    }
    .favorite-page__title {
      text-align: center;
      margin-bottom: 40px;
      font-size: 42px;
      color: ${unsafeCSS(COLORS.primary)};
      font-weight: 700;
    }
    .favorite-page__content {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 20px;
    }
  `;
}
