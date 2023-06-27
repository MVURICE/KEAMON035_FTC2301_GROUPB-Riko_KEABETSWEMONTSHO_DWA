/* eslint-disable class-methods-use-this */
/* eslint-disable import/extensions */
import { html, css, LitElement } from '../lit/lit-html.js';

class TallyHeader extends LitElement {
  static styles = css`
    header {
      margin: 10px;
    }
    h1 {
      font-size: 2rem;
      text-align: center;
    }
  `;

  render() {
    return html`
      <header>
        <h1>Tally Counter</h1>
      </header>
    `;
  }
}

customElements.define('tally-header', TallyHeader);