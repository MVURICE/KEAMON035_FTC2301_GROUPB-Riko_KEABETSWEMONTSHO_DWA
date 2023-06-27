/* eslint-disable class-methods-use-this */
/* eslint-disable import/extensions */

import {  LitElement, html } from '../lit/lit-html.js';
import './header.js';
import './main.js';
import './footer.js';

class TallyApp extends LitElement {
  render() {
    return html`
      <tally-header></tally-header>
      <tally-main></tally-main>
      <tally-footer></tally-footer>
    `;
  }
}

customElements.define('tally-app', TallyApp);