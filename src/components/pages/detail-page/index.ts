import UrlParser from "@/utils/url-parser";
import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import "@/components/pages/detail-page/review-item";
import "@/components/pages/detail-page/menu";
import "@/components/pages/detail-page/add-review";
import "@/components/pages/detail-page/rate";
import { SKIP_CONTENT_TARGET } from "@/constants";
import { RestaurantDetail } from "@/types";
import RestaurantSource from "@/data/restaurant-source";
import CONFIG from "@/constants/config";

@customElement("detail-page")
export class DetailPage extends LitElement {
  @property() loading = false;
  @property() data: RestaurantDetail | undefined = undefined;

  connectedCallback() {
    super.connectedCallback();
    this._fetchData();
  }

  async _fetchData() {
    try {
      this.loading = true;
      const arrayUrl = UrlParser.parseActiveUrlWithoutCombiner();
      this.data = await RestaurantSource.getRestaurantDetail(arrayUrl.id);
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

  protected render() {
    return html`<div class="detail-page">
      ${this.loading
        ? html`<div
            style="background:#fff; z-index: 100; position:fixed; top:0; right:0; bottom:0; left:0; display: flex; min-height: 100vh; justify-content: center; align-items: center;"
          >
            <custom-loader></custom-loader>
          </div>`
        : null}

      <div class="section-1">
        <picture>
          <source
            media="(max-width: 768px)"
            srcset="${CONFIG.BASE_IMAGE_URL}/small/${this.data?.pictureId}"
          />
          <img
            src="${CONFIG.BASE_IMAGE_URL}/medium/${this.data?.pictureId}"
            alt="Image of ${this.data?.name}"
            loading="lazy"
          />
        </picture>
      </div>
      <div class="section-2">
        <h1
          id="${SKIP_CONTENT_TARGET}"
          data-scroll-offset="1000"
          tabindex="0"
          class="section-2__title"
        >
          ${this.data?.name}
        </h1>
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
              stroke="#ae1414"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          Lokasi : ${this.data?.address}, ${this.data?.city}
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

  protected createRenderRoot() {
    return this;
  }
}
