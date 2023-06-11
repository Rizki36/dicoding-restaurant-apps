import UrlParser from "@/utils/url-parser";
import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import "@/components/pages/detail-page/review-item";

type Data = {
  id: string;
  name: string;
  description: string;
  city: string;
  address: string;
  pictureId: string;
  categories: {
    name: string;
  }[];
  menus: {
    foods: {
      name: string;
    }[];
    drinks: {
      name: string;
    }[];
  };
  rating: number;
  customerReviews: {
    name: string;
    review: string;
    date: string;
  }[];
};

@customElement("detail-page")
export class DetailPage extends LitElement {
  @property() loading = false;
  @property() data: Data | null = null;

  connectedCallback() {
    super.connectedCallback();
    this._fetchData();
  }

  getRatePercentage() {
    return ((this.data?.rating ?? 0) / 5) * 100;
  }

  async _fetchData() {
    try {
      this.loading = true;

      const arrayUrl = UrlParser.parseActiveUrlWithoutCombiner();
      const response = await fetch(
        `https://restaurant-api.dicoding.dev/detail/${arrayUrl.id}`
      );
      const json = await response.json();
      this.data = json.restaurant;
    } catch (error) {
      console.error(error);
    } finally {
      this.loading = false;
    }
  }

  render() {
    return html`<div class="detail-page">
      <div class="section-1">
        <img
          src="https://restaurant-api.dicoding.dev/images/medium/${this.data
            ?.pictureId}"
          alt="Image of ${this.data?.name}"
        />
      </div>
      <div class="section-2">
        <h1 class="section-2__title">${this.data?.name}</h1>
        <div class="section-2__location">Lokasi : ${this.data?.address}</div>
        <div><b>Deskripsi</b></div>
        <p class="section-2__description">${this.data?.description}</p>
        <div class="section-2__menu">
          <div>Minuman</div>
          <div>Makanan</div>
        </div>
      </div>
      <div class="section-3">
        <div class="section-3__rate-container">
          <h2 class="section-3__rate-title">Ulasan Pembeli</h2>
          <div class="section-3__rate-number">
            ${this.data?.rating}<span class="section-3__rate-total-number"
              >/5</span
            >
          </div>
          <div class="section-3__rate-summary">
            ${this.getRatePercentage()}% Pelanggan Merasa Puas
          </div>
          <div class="section-3__rate-actions">
            <div class="section-3__rate-action">Tandai</div>
            <div class="section-3__rate-action">Bagikan</div>
          </div>
        </div>

        <div class="section-3__review-container">
          <div class="section-3__review-title">Ulasan Pembeli</div>
          <div class="section-3__review-items">
            ${(this.data?.customerReviews ?? []).map(
              (item) => html`<review-item
                name="${item.name}"
                date="${item.date}"
                review="${item.review}"
              ></review-item>`
            )}
          </div>
        </div>
      </div>
    </div>`;
  }

  static styles? = css`
    * {
      box-sizing: border-box;
      color: #3a3a3a;
      margin-block-start: 0;
      margin-block-end: 0;
    }

    .detail-page {
      margin-top: 118px;
      display: grid;
      grid-template-columns: 1fr;
      column-gap: 48px;
      padding: 24px;
      padding-top: 0;
      min-height: 100vh;
    }

    .section-1 img {
      width: 100%;
      aspect-ratio: 16/9;
      object-fit: cover;
      border-radius: 8px;
    }

    .section-2__title {
      margin-top: 12px;
    }
    .section-2__location {
      margin-bottom: 24px;
    }
    .section-2__menu {
      display: flex;
      column-gap: 36px;
      margin-top: 48px;
      margin-bottom: 48px;
    }

    .section-3__rate-container {
      padding: 18px;
      border: 1px solid #eeeeee;
      border-radius: 8px;
    }
    .section-3__rate-title {
      text-align: center;
      margin-bottom: 12px;
      font-size: 32px;
    }
    .section-3__rate-number {
      font-size: 48px;
      font-weight: bold;
      text-align: center;
    }
    .section-3__rate-total-number {
      font-size: 24px;
    }
    .section-3__rate-summary {
      text-align: center;
      margin-bottom: 24px;
    }
    .section-3__rate-actions {
      display: flex;
      justify-content: center;
      column-gap: 24px;
    }
    .section-3__rate-action {
      font-weight: bold;
    }
    .section-3__review-container {
      padding-top: 24px;
      margin-top: 24px;
      border-top: 1px solid #eeeeee;
    }
    .section-3__review-item {
      display: flex;
      column-gap: 12px;
    }
    .section-3__reviewer-image {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      background-color: #eeeeee;
    }
    .section-3__review-title {
      font-size: 24px;
      font-weight: bold;
      margin-bottom: 16px;
    }
    .section-3__reviewer-name {
      font-weight: bold;
    }
    .section-3__reviewed-at {
      font-size: 12px;
      margin-bottom: 8px;
    }

    @media (min-width: 1180px) {
      .detail-page {
        grid-template-columns: 1fr 1fr 338px;
      }
      .section-2__title {
        margin-top: 0;
        line-height: 1;
        margin-bottom: 8px;
      }
    }
  `;
}
