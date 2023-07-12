import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("hero-section")
export class HeroSection extends LitElement {
  render() {
    return html`<section class="hero">
      <picture>
        <source
          media="(max-width: 768px)"
          srcset="/images/heros/hero-img.jpg"
        />
        <img
          class="hero__background"
          src="/images/heros/hero-img_lg.jpg"
          alt="Hero background"
        />
      </picture>
      <div class="hero__wrapper">
        <!-- left hero -->
        <div class="hero__left">
          <h1 class="hero__left-title">All Restaurants Near you are here</h1>
          <p class="hero__left-subtitle">
            We make it easy for you to find delicious restaurants around you.
          </p>
          <a class="btn-find" href="/">Let’s Find</a>
        </div>

        <!-- right hero -->
        <div class="hero__right">
          <img
            width="343px"
            height="458px"
            style="object-fit: cover;"
            src="/images/hero.png"
            alt="Hero image"
          />
        </div>
      </div>
    </section>`;
  }

  protected createRenderRoot() {
    return this;
  }
}
