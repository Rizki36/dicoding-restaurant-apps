import UrlParser from "@/utils/url-parser";
import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import "@/components/pages/detail-page/review-item";
import "@/components/pages/detail-page/menu";
import "@/components/pages/detail-page/add-review";

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

  _getRatePercentage() {
    return Math.round(((this.data?.rating ?? 0) / 5) * 100);
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
        <div class="section-3__rate-container">
          <h2 class="section-3__rate-title">Ulasan Pembeli</h2>
          <div class="section-3__rate-number">
            <svg
              width="31"
              height="30"
              viewBox="0 0 31 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18.1778 2.16627L20.9055 7.48933C21.2775 8.23032 22.2694 8.94107 23.1063 9.07717L28.0502 9.87865C31.2119 10.3928 31.9558 12.6309 29.6776 14.8387L25.834 18.5891C25.1831 19.2242 24.8266 20.4491 25.0281 21.3262L26.1285 25.9687C26.9964 29.6435 24.9971 31.065 21.665 29.1444L17.031 26.4678C16.1941 25.9839 14.8147 25.9839 13.9623 26.4678L9.32831 29.1444C6.01168 31.065 3.9969 29.6283 4.86481 25.9687L5.96518 21.3262C6.16666 20.4491 5.8102 19.2242 5.15927 18.5891L1.3157 14.8387C-0.94705 12.6309 -0.21863 10.3928 2.94302 9.87865L7.88697 9.07717C8.70838 8.94107 9.70027 8.23032 10.0722 7.48933L12.7999 2.16627C14.2878 -0.722091 16.7055 -0.722091 18.1778 2.16627Z"
                fill="#FFB133"
              />
            </svg>

            ${this.data?.rating}<span class="section-3__rate-total-number"
              >/5</span
            >
          </div>
          <div class="section-3__rate-summary">
            ${this._getRatePercentage()}% Pelanggan Merasa Puas
          </div>
          <div class="section-3__rate-actions">
            <button type="button" class="section-3__rate-action">
              <svg
                width="14"
                height="19"
                viewBox="0 0 14 19"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 4.2002V13.6854C1 15.0464 1 15.7268 1.20412 16.1433C1.58245 16.9151 2.41157 17.3588 3.26367 17.2454C3.7234 17.1842 4.28964 16.8067 5.4221 16.0518L5.4248 16.0499C5.8737 15.7507 6.0981 15.6011 6.333 15.5181C6.7642 15.3656 7.2348 15.3656 7.666 15.5181C7.9013 15.6012 8.1266 15.7515 8.5773 16.0519C9.7098 16.8069 10.2767 17.1841 10.7364 17.2452C11.5885 17.3586 12.4176 16.9151 12.7959 16.1433C13 15.7269 13 15.0462 13 13.6854V4.19691C13 3.07899 13 2.5192 12.7822 2.0918C12.5905 1.71547 12.2837 1.40973 11.9074 1.21799C11.4796 1 10.9203 1 9.8002 1H4.2002C3.08009 1 2.51962 1 2.0918 1.21799C1.71547 1.40973 1.40973 1.71547 1.21799 2.0918C1 2.51962 1 3.08009 1 4.2002Z"
                  stroke="#3A3A3A"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              Tandai
            </button>
            <button type="button" class="section-3__rate-action">
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#clip0_102_280)">
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M14.4 10.6875C13.4073 10.6875 12.6 9.8802 12.6 8.8875C12.6 7.8948 13.4073 7.0875 14.4 7.0875C15.3927 7.0875 16.2 7.8948 16.2 8.8875C16.2 9.8802 15.3927 10.6875 14.4 10.6875ZM3.6 16.2C2.6073 16.2 1.8 15.3927 1.8 14.4C1.8 13.4073 2.6073 12.6 3.6 12.6C5.9787 12.6 5.9796 16.2 3.6 16.2ZM3.6 5.4C2.6073 5.4 1.8 4.5927 1.8 3.6C1.8 2.6073 2.6073 1.8 3.6 1.8C5.9787 1.8 5.9796 5.4 3.6 5.4ZM14.4 5.2875C13.3011 5.2875 12.33 5.79051 11.6694 6.56631L7.16311 3.96453C7.39081 1.72713 5.6421 0 3.6 0C1.6119 0 0 1.6119 0 3.6C0 5.5881 1.6119 7.2 3.6 7.2C4.8123 7.2 5.87879 6.59617 6.53129 5.67817L10.8711 8.18372C10.7739 8.67332 10.7766 9.14499 10.8792 9.63369L6.42689 12.1959C5.76809 11.3517 4.7529 10.8 3.6 10.8C1.6119 10.8 0 12.4119 0 14.4C0 16.3881 1.6119 18 3.6 18C5.7258 18 7.4916 16.1351 7.1451 13.859L11.6955 11.241C12.3552 11.9988 13.3164 12.4875 14.4 12.4875C16.3881 12.4875 18 10.8756 18 8.8875C18 6.8994 16.3881 5.2875 14.4 5.2875Z"
                    fill="#3A3A3A"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_102_280">
                    <rect width="18" height="18" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              Bagikan
            </button>
          </div>
        </div>

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
    }
    .section-3__rate-action {
      font-weight: bold;
      display: flex;
      align-items: center;
      column-gap: 12px;
      border: none;
      background-color: transparent;
      cursor: pointer;
      padding: 8px 24px;
    }
    .section-3__rate-action:first-child {
      border-right: 1px solid #eeeeee;
      padding-right: 24px;
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
