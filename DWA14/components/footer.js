/* eslint-disable class-methods-use-this */
/* eslint-disable import/extensions */
import { html, LitElement } from '../lit/lit-html.js';

class TallyFooter extends LitElement {
  render() {
    return html`
      <footer>
        Inspired by
        <a class="footer__link" href="https://tallycount.app/">Tally Count</a>.
      </footer>
    `;
  }
}

customElements.define('tally-footer', TallyFooter)