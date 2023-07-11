import { LitElement, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import "@/components/shared/food-card";
import { Restaurant } from "@/types";
import FavoriteIDB from "@/data/favorite-idb";
import { map } from "lit/directives/map.js";
import { SKIP_CONTENT_TARGET } from "@/constants";

@customElement("favorite-page")
export class FavoritePage extends LitElement {
  @state() foods: Restaurant[] = [];
  @state() search = "";

  connectedCallback() {
    super.connectedCallback();
    this._getList();
  }

  protected render() {
    return html`<div class="favorite-page">
      <h1 data-scroll-offset="100" class="favorite-page__title">Favorit Mu</h1>
      <div class="favorite-page__search-container">
        <label for="query">Cari</label>
        <input
          id="query"
          name="name"
          class="form-input"
          placeholder="Masukkan Nama Restaurant"
          @input=${(e: Event) => {
            const target = e.target as HTMLInputElement;
            const query = target.value;
            this.search = query;
          }}
        />
      </div>
      <div
        id="${SKIP_CONTENT_TARGET}"
        data-scroll-offset="-200"
        tabindex="0"
        class="favorite-page__content"
      >
        ${this._renderList()}
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

  get _filteredFoods() {
    return this.foods.filter((food) =>
      food.name.toLowerCase().includes(this.search.toLowerCase())
    );
  }

  _renderList() {
    if (!this.foods.length)
      return html`<div class="favorite-page__empty">
        <h2 class="favorite-page__empty__title">
          Kamu belum menambahkan restaurant ke favorite
        </h2>
        <p class="favorite-page__empty__description">
          Kembali ke
          <a
            href="/"
            style="display:flex; align-items: center; justify-content:center; height: 44px;"
            >Home Page</a
          >
          untuk menambahkan restaurant ke favorite
        </p>
      </div>`;

    if (!this._filteredFoods.length)
      return html`<div class="favorite-page__empty">
        <h2 class="favorite-page__empty__title">Restaurant tidak ditemukan</h2>
        <p class="favorite-page__empty__description">
          Coba cari dengan kata kunci lain
        </p>
      </div>`;

    return map(
      this._filteredFoods,
      (restaurant) => html`<food-card
        id=${restaurant.id}
        pictureId=${restaurant.pictureId}
        city=${restaurant.city}
        name=${restaurant.name}
        description=${restaurant.description}
        rating=${restaurant.rating}
        @on-success-change-favorite=${() => this._getList()}
      ></food-card> `
    );
  }
}
