import { COLORS } from "@/constants";
import FavoriteIDB from "@/utils/favorite-idb";
import UrlParser from "@/utils/url-parser";
import { LitElement, css, html, unsafeCSS } from "lit";
import { customElement, property, state } from "lit/decorators.js";

@customElement("food-card")
export class FoodCard extends LitElement {
  @state() isFavorite = false;

  @property({ type: String }) id = "";
  @property({ type: String }) pictureId = "";
  @property({ type: String }) city = "";
  @property({ type: String }) name = "";
  @property({ type: String }) description = "";
  @property({ type: Number }) rating = 0;

  connectedCallback() {
    super.connectedCallback();
    this._checkFavorite();
  }

  async _handleClickFavorite() {
    try {
      if (this.isFavorite) {
        await FavoriteIDB.delete(this.id);
      } else {
        await FavoriteIDB.put({
          id: this.id,
          pictureId: this.pictureId,
          city: this.city,
          name: this.name,
          description: this.description,
          rating: this.rating,
        });
      }

      this.isFavorite = !this.isFavorite;
    } catch (error) {
      alert("Gagal menambahkan ke favorite");
    }
  }

  async _checkFavorite() {
    try {
      const data = await FavoriteIDB.getOne(this.id);

      if (!data) return;

      this.isFavorite = true;
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    return html`
      <div tabindex="0" class="foods__item">
        <div class="foods__item-image">
          <img
            src="https://restaurant-api.dicoding.dev/images/medium/${this
              .pictureId}"
            alt="Image of ${this?.name} restaurant"
          />
          <span class="foods__item-city">${this.city}</span>
        </div>

        <button
          @click=${this._handleClickFavorite}
          type="button"
          class="foods__add-to-favorite"
          title=${this.isFavorite ? "Hapus dari favorit" : "Tambah ke favorit"}
        >
          <svg
            width="14"
            height="19"
            viewBox="0 0 14 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 4.2002V13.6854C1 15.0464 1 15.7268 1.20412 16.1433C1.58245 16.9151 2.41157 17.3588 3.26367 17.2454C3.7234 17.1842 4.28964 16.8067 5.4221 16.0518L5.4248 16.0499C5.8737 15.7507 6.0981 15.6011 6.333 15.5181C6.7642 15.3656 7.2348 15.3656 7.666 15.5181C7.9013 15.6012 8.1266 15.7515 8.5773 16.0519C9.7098 16.8069 10.2767 17.1841 10.7364 17.2452C11.5885 17.3586 12.4176 16.9151 12.7959 16.1433C13 15.7269 13 15.0462 13 13.6854V4.19691C13 3.07899 13 2.5192 12.7822 2.0918C12.5905 1.71547 12.2837 1.40973 11.9074 1.21799C11.4796 1 10.9203 1 9.8002 1H4.2002C3.08009 1 2.51962 1 2.0918 1.21799C1.71547 1.40973 1.40973 1.71547 1.21799 2.0918C1 2.51962 1 3.08009 1 4.2002Z"
              stroke=${this.isFavorite ? COLORS.primary : "#3A3A3A"}
              fill=${this.isFavorite ? COLORS.primary : "none"}
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          ${this.isFavorite ? "Di Favoritkan" : "Favoritkan"}
        </button>

        <div class="foods__item-content">
          <h3 class="foods__item-name">${this.name}</h3>
          <div class="foods__item-rating">
            <img src="/images/star-icon.svg" alt="Rating" />
            <span>${this.rating}</span>
          </div>
          <p class="foods__item-description">${this.description}</p>

          <div class="foods__item-buy">
            <a href="#/detail/${this.id}">Detail</a>
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
      top: 18px;
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
    .foods__add-to-favorite {
      display: flex;
      align-items: center;
      border: none;
      position: absolute;
      top: 100px;
      left: 26px;
      background-color: white;
      padding: 8px;
      cursor: pointer;
      border-radius: 8px;
      gap: 8px;
    }
  `;
}
