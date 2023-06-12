import UrlParser from "@/utils/url-parser";
import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import "@/components/pages/detail-page/review-item";
import "@/components/pages/detail-page/menu";
import "@/components/pages/detail-page/add-review";
import "@/components/pages/detail-page/rate";

export type RestaurantData = {
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
  @property() data: RestaurantData | null = null;

  connectedCallback() {
    super.connectedCallback();
    this._fetchData();
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

  _addReviewCallback(event: CustomEvent) {
    this.data = {
      ...this.data,
      customerReviews: event.detail ?? [],
    };
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
        <div class="section-2__location">
          <svg
            width="16"
            height="17"
            viewBox="0 0 16 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4.70894 7.74015H10.4784M7.59367 4.79134V10.689M14.1873 7.74015C14.1873 11.2306 11.5918 14.1013 8.26614 15.8348C7.84357 16.0551 7.34377 16.0551 6.9212 15.8348C3.59551 14.1013 1 11.2306 1 7.74015C1 4.01767 3.95208 1 7.59367 1C11.2353 1 14.1873 4.01767 14.1873 7.74015Z"
              stroke="#E75659"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          Lokasi : ${this.data?.address}
        </div>
        <div><b>Deskripsi</b></div>
        <p class="section-2__description">${this.data?.description}</p>
        <menu-section
          .makanan=${this.data?.menus?.foods ?? []}
          .minuman=${this.data?.menus?.drinks ?? []}
        ></menu-section>
      </div>
      <div class="section-3">
        <rate-section .data=${this.data}></rate-section>

        <div class="section-3__review-container">
          <div class="section-3__review-title">
            <svg
              width="23"
              height="23"
              viewBox="0 0 23 23"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <mask
                id="mask0_102_330"
                style="mask-type:luminance"
                maskUnits="userSpaceOnUse"
                x="0"
                y="0"
                width="23"
                height="23"
              >
                <path d="M23 0H0V23H23V0Z" fill="white" />
              </mask>
              <g mask="url(#mask0_102_330)">
                <path
                  d="M11.5 20.125C16.2635 20.125 20.125 16.2635 20.125 11.5C20.125 6.73655 16.2635 2.875 11.5 2.875C6.73655 2.875 2.875 6.73655 2.875 11.5C2.875 12.9256 3.22089 14.2705 3.83333 15.4552L2.875 20.125L7.54477 19.1667C8.7295 19.7791 10.0744 20.125 11.5 20.125Z"
                  stroke="#292929"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </g>
            </svg>
            Ulasan Pembeli
          </div>
          <div class="section-3__review-items">
            ${(this.data?.customerReviews ?? []).map(
              (item) => html`<review-item
                name="${item.name}"
                date="${item.date}"
                review="${item.review}"
              ></review-item>`
            )}
          </div>
          <add-review
            @on-success-add-review=${this._addReviewCallback}
          ></add-review>
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
      display: flex;
      align-items: center;
      column-gap: 12px;
    }
    .section-2__menu {
      display: flex;
      column-gap: 36px;
      margin-top: 48px;
      margin-bottom: 48px;
    }

    .section-3__review-container {
      padding-top: 24px;
      margin-top: 24px;
      border-top: 1px solid #eeeeee;
    }
    .section-3__review-title {
      font-size: 24px;
      font-weight: bold;
      margin-bottom: 16px;
      display: flex;
      align-items: center;
      column-gap: 12px;
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
