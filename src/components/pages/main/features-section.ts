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
              <img
                width="56px"
                height="56px"
                style="object-fit: cover;"
                src="./images/features/fast.svg"
                alt="Fast Delivery"
              />
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
              <img
                width="73px"
                height="73px"
                style="object-fit: cover;"
                src="./images/features/centralized.svg"
                alt="Centralized"
              />
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
              <img
                width="58px"
                height="58px"
                style="object-fit: cover;"
                src="./images/features/trusted.svg"
                alt="Trusted"
              />
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

  protected createRenderRoot() {
    return this;
  }
}
