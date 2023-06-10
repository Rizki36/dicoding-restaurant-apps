import { COLORS } from "@/constants";
import { LitElement, css, html, unsafeCSS } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("hero-section")
export class HeroSection extends LitElement {
  static styles = css`
    * {
      box-sizing: border-box;
    }

    .hero {
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #fff0e9;
      border-bottom-left-radius: 30px;
      border-bottom-right-radius: 30px;
      padding: 24px;
      position: relative;
      overflow: hidden;

      .hero__background {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        object-fit: cover;
        width: 100%;
        height: 100%;
        z-index: 1;
        opacity: 15%;
      }

      .hero__wrapper {
        z-index: 1;
      }

      .hero__left {
        padding-top: 80px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        z-index: 1;
      }
      .hero__left-title {
        font-size: 36px;
        line-height: 36px;
        font-weight: 800;
        color: ${unsafeCSS(COLORS.primary)};
        text-align: center;
        margin-block-start: 0;
        margin-block-end: 0;
      }
      .hero__left-subtitle {
        font-size: 12px;
        line-height: 16px;
        font-weight: 800;
        color: #3a3a3a;
        text-align: center;
        max-width: 235px;
        margin-top: 16px;
      }

      .hero__right {
        display: none;
        z-index: 1;
      }

      .btn-find {
        margin-top: 42px;
        background-color: ${unsafeCSS(COLORS.secondary)};
        color: #3a3a3a;
        font-size: 12px;
        font-weight: 800;
        padding: 15px;
        border-radius: 42px;
        text-decoration: none;
      }
    }

    @media (min-width: 768px) {
      .hero {
        justify-content: space-between;
        padding: 100px 50px 120px;

        .hero__wrapper {
          display: grid;
          column-gap: 30px;
          grid-template-columns: 1fr auto;
          flex-direction: row;
          justify-content: space-between;
          align-items: normal;
          margin-left: auto;
          margin-right: auto;
          width: 100%;
          max-width: 1200px;
        }

        .hero__left {
          align-items: start;
        }
        .hero__left-title {
          font-size: 64px;
          line-height: 70px;
          max-width: 540px;
          text-align: left;
        }
        .hero__left-subtitle {
          text-align: left;
          font-size: 16px;
          max-width: none;
        }
        .hero__right {
          display: none;
        }
        .hero__right img {
          height: 343px;
          width: auto;
        }
        .btn-find {
          margin-top: 34px;
          font-size: 16px;
          padding: 18px 27px;
        }
      }
    }

    @media (min-width: 1180px) {
      .hero {
        .hero__left-title {
          text-align: left;
        }
        .hero__left {
          align-items: flex-start;
        }
        .hero__right {
          display: flex;
        }
        .hero__right img {
          height: 343px;
          width: auto;
        }
      }
    }
  `;

  render() {
    return html`<section class="hero">
      <img
        class="hero__background"
        src="/images/heros/hero-image_2.jpg"
        alt="Hero background"
      />
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
          <img src="/images/hero.png" alt="Hero image" />
        </div>
      </div>
    </section>`;
  }
}
