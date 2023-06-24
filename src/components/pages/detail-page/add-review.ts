import { COLORS } from "@/constants";
import UrlParser from "@/utils/url-parser";
import { LitElement, css, html, unsafeCSS } from "lit";
import { customElement, state } from "lit/decorators.js";
import { RestaurantData } from ".";

type AddReviewData = {
  id: string;
  name: string;
  review: string;
};

@customElement("add-review")
export class AddReview extends LitElement {
  @state()
  loading = false;

  async _onSubmit(e: Event) {
    e.preventDefault();
    const form = e.target as HTMLFormElement;

    const review = form.querySelector("textarea") as HTMLTextAreaElement;
    const name = form.querySelector("input[name=name]") as HTMLInputElement;
    const id = UrlParser.parseActiveUrlWithoutCombiner().id;

    if (!review || !id || !name) return;

    try {
      const response = await this._postAddReview({
        id,
        name: name.value,
        review: review.value,
      });

      const data: {
        customerReviews: RestaurantData["customerReviews"];
      } = await response.json();

      review.value = "";
      name.value = "";

      const callbackEvent = new CustomEvent("on-success-add-review", {
        detail: data.customerReviews,
      });
      this.dispatchEvent(callbackEvent);
    } catch (error) {
      console.error(error);
      alert("Gagal menambahkan review");
    } finally {
      this.loading = false;
    }
  }

  _postAddReview(data: AddReviewData) {
    return fetch("https://restaurant-api.dicoding.dev/review", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  }

  render() {
    return html`<div class="section-3__add-review">
      <div class="section-3__add-review-title">Beri Komentar</div>
      <form @submit=${this._onSubmit}>
        <label for="name">Nama</label>
        <input
          id="name"
          name="name"
          class="form-input"
          placeholder="Masukkan Nama mu"
        />
        <label for="review">Review</label>
        <textarea
          id="review"
          name="review"
          class="form-input"
          rows="10"
        ></textarea>
        <button type="submit">Kirim</button>
      </form>
    </div> `;
  }

  static styles = css`
    * {
      box-sizing: border-box;
    }
    .section-3__add-review-title {
      margin-block-start: 0;
      margin-block-end: 0;
      margin: 12px 0;
      font-size: 14px;
    }
    textarea.form-input {
      width: 100%;
      display: block;
      resize: vertical;
      margin-bottom: 8px;
      border: 1px solid #d1d1d1;
      border-radius: 8px;
      padding: 8px;
    }
    input.form-input {
      width: 100%;
      margin-bottom: 8px;
      border: 1px solid #d1d1d1;
      border-radius: 4px;
      padding: 8px;
    }
    .section-3__add-review button {
      display: block;
      margin-left: auto;
      background-color: ${unsafeCSS(COLORS.primary)};
      color: white;
      border: none;
      padding: 8px 24px;
      border-radius: 8px;
    }
  `;
}
