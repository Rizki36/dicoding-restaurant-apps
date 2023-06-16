import { LitElement, css, html, unsafeCSS } from "lit";
import { map } from "lit/directives/map.js";
import { customElement, state } from "lit/decorators.js";
import "@/components/shared/food-card";
import { COLORS } from "@/constants";
import { Food } from "@/types";

@customElement("foods-section")
export class FoodsSection extends LitElement {
  @state()
  loading = false;
  @state()
  foods: Food[] = [];

  connectedCallback() {
    super.connectedCallback();
    this._fetchData();
  }

  async _fetchData() {
    try {
      this.loading = true;

      const response = await fetch("https://restaurant-api.dicoding.dev/list");
      const json = await response.json();
      this.foods = json.restaurants;
    } catch (error) {
      console.error(error);
    } finally {
      this.loading = false;
    }
  }

  render() {
    return html`
      <section id="foods" class="foods">
        <h2 class="foods__title">
          Our <br />
          Best Menu
        </h2>
        <div class="foods__list">
          ${map(
            this.foods,
            (restaurant) => html`<food-card
              id=${restaurant.id}
              pictureId=${restaurant.pictureId}
              city=${restaurant.city}
              name=${restaurant.name}
              description=${restaurant.description}
              rating=${restaurant.rating}
            ></food-card> `
          )}
        </div>
      </section>
    `;
  }

  static styles = css`
    * {
      box-sizing: border-box;
    }

    .foods {
      .foods__title {
        color: ${unsafeCSS(COLORS.primary)};
        font-weight: 800;
        text-align: center;
        margin: auto;
        margin-bottom: 36px;
        line-height: 32px;
      }
      .foods__list {
        display: flex;
        gap: 36px;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
      }
    }

    @media (min-width: 768px) {
      .foods {
        .foods__title {
          font-size: 48px;
          max-width: none;
          margin-bottom: 62px;
        }
        .foods__title br {
          display: none;
        }
        .foods__list {
          row-gap: 50px;
          column-gap: 40px;
        }
      }
    }
  `;
}
