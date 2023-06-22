import { LitElement, css, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import "@/components/shared/food-card";
import { Food } from "@/types";
import FavoriteIDB from "@/utils/favorite-idb";
import { map } from "lit/directives/map.js";
import { SKIP_CONTENT_TARGET } from "@/constants";

@customElement("favorite-page")
export class FavoritePage extends LitElement {
  @state() foods: Food[] = [];

  connectedCallback() {
    super.connectedCallback();
    this._getList();
  }

  protected render() {
    return html`<div class="favorite-page">
      <h1
        id="${SKIP_CONTENT_TARGET}"
        tabindex="0"
        data-scroll-offset="100"
        class="favorite-page__title"
      >
        Your Favorite
      </h1>
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

  protected createRenderRoot() {
    return this;
  }

  async _getList() {
    try {
      const foods = await FavoriteIDB.getAll();
      this.foods = foods;
    } catch (error) {
      alert("Gagal mengambil data");
    }
  }
}
