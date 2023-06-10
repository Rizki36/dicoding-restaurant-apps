import { LitElement, css, html } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("detail-page")
export class DetailPage extends LitElement {
  render() {
    return html`<div class="detail-page">
      <div class="section-1">
        <img
          src="https://restaurant-api.dicoding.dev/images/medium/08"
          alt=""
        />
      </div>
      <div class="section-2">
        <h1 class="section-2__title">Fairy Cafe</h1>
        <div class="section-2__location">Lokasi : Malang</div>
        <div><b>Deskripsi</b></div>
        <p class="section-2__description">
          But I must explain to you how all this mistaken idea of denouncing
          pleasure and praising pain was born and I will give you a complete
          account of the system, and expound the actual teachings of the great
          explorer of the truth, the master-builder of human happiness. No one
          rejects, dislikes, or avoids pleasure itself, because it is pleasure,
          but because those who do not know how to pursue pleasure rationally
          encounter consequence...
        </p>
        <div class="section-2__menu">
          <div>Minuman</div>
          <div>Makanan</div>
        </div>
      </div>
      <div class="section-3">
        <div class="section-3__rate-container">
          <h2 class="section-3__rate-title">Ulasan Pembeli</h2>
          <div class="section-3__rate-number">
            4.5<span class="section-3__rate-total-number">/5</span>
          </div>
          <div class="section-3__rate-summary">90% Pelanggan Merasa Puas</div>
          <div class="section-3__rate-actions">
            <div class="section-3__rate-action">Tandai</div>
            <div class="section-3__rate-action">Bagikan</div>
          </div>
        </div>

        <div class="section-3__review-container">
          <div class="section-3__review-title">Ulasan Pembeli</div>
          <div class="section-3__review-items">
            <div class="section-3__review-item">
              <div class="section-3__reviewer-image"></div>
              <div>
                <div class="section-3__reviewer-name">Ahmad</div>
                <div class="section-3__reviewed-at">13 November 2019</div>
                <div class="section-3__review">
                  Tidak rekomendasi untuk pelajar!
                </div>
              </div>
            </div>
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
