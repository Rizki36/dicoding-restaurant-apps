import { LitElement, css, html } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("custom-loader")
export class CustomLoader extends LitElement {
  render() {
    return html`<div class="loader"></div>`;
  }

  static styles = css`
    .loader {
      border: 5px solid #f3f3f3;
      border-top: 5px solid #555;
      border-radius: 50%;
      width: 50px;
      height: 50px;
      animation: spin 2s linear infinite;
    }

    @keyframes spin {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
  `;
}
