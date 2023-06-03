import { LitElement, css, html } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("features-section")
export class FeaturesSection extends LitElement {
  render() {
    return html`
      <section class="features">
        <div class="features__container">
          <div class="features__item">
            <div class="features__item-icon">
              <img src="./images/features/fast.svg" alt="Fast Delivery" />
            </div>
            <div class="features__item-content">
              <h2 class="features__item-title">Fast Delivery</h2>
              <p class="features__item-description">
                We can deliver your order quickly
              </p>
            </div>
          </div>
          <div class="features__item">
            <div class="features__item-icon">
              <img src="./images/features/centralized.svg" alt="Centralized" />
            </div>
            <div class="features__item-content">
              <h2 class="features__item-title">Centralized</h2>
              <p class="features__item-description">
                All restaurants become one here
              </p>
            </div>
          </div>
          <div class="features__item">
            <div class="features__item-icon">
              <img src="./images/features/trusted.svg" alt="Trusted" />
            </div>
            <div class="features__item-content">
              <h2 class="features__item-title">Trusted</h2>
              <p class="features__item-description">
                Food is guaranteed to be hygienic
              </p>
            </div>
          </div>
        </div>
      </section>
    `;
  }

  static styles = css`
    * {
      box-sizing: border-box;
    }

    .features {
      display: flex;
      justify-content: center;
      padding-top: 60px;
      padding-bottom: 60px;
      border-bottom: 1px solid #d8d8d8;
      margin-left: 30px;
      margin-right: 30px;
      margin-bottom: 30px;
      z-index: 2;

      .features__container {
        display: grid;
        grid-template-columns: repeat(1, 1fr);
        align-items: center;
        justify-content: center;
        gap: 42px;
      }

      .features__item {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }
      .features__item-icon {
        width: 86px;
        height: 86px;
        border-radius: 50%;
        background-color: $secondary;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .features__item-content {
        margin-top: 8px;
      }

      .features__item-title {
        color: #3a3a3a;
        font-weight: 800;
        font-size: 24px;
        line-height: 150%;
        text-align: center;
        margin-block-start: 0;
        margin-block-end: 0;
      }
      .features__item-description {
        color: #565251;
        font-weight: 500;
        font-size: 14px;
        line-height: 100%;
        text-align: center;
        margin-block-start: 0;
        margin-block-end: 0;
      }
    }

    @media (min-width: 768px) {
      .features {
        border-bottom: none;
        position: relative;
        height: 200px;

        .features__container {
          justify-content: center;
          align-items: center;
          margin-left: auto;
          margin-right: auto;
          max-width: 1200px;
          position: absolute;
          top: -50px;
          grid-template-columns: repeat(3, 1fr);
          background-color: #fff;
          border-radius: 16px;
          padding: 30px 62px;
          box-shadow: 0px 2px 16px 0px #3a3a3a40;
        }
      }
    }
  `;
}
