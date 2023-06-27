/* eslint-disable class-methods-use-this */
/* eslint-disable import/extensions */
import { LitElement, html, css } from '../lit/lit-html.js';

class TallyMain extends LitElement {

  static styles = css`
    .counter__value {
      width: 100%;
      height: 15rem;
      text-align: center;
      font-size: 6rem;
      font-weight: 900;
      background-color: #4c4e53;
      color: white;
    }

    .counter__actions {
      display: flex;
    }

    .counter__button {
      color: white;
      background: #333333;
      width: 50%;
      height: 10rem;
      columns: #4c4e53;
      font-size: 3rem;
      border-bottom: 1px solid #4c4e53;
    }

    .counter__button:active {
      background: #424250;
      transform: translateY(2%);
    }

    .counter__button:disabled {
      opacity: 0.2;
    }

    .reset_actions {
      text-align: center;
      border-bottom: 1px solid white;
      padding: 20px
    }

    .reset_button {
      border: none;
      border-raduis: 20%;
      color: white;
      padding: 0.8rem;
      font-size: 1.5rem;
      background-color: grey;
    }

    .reset_button:active {
      transform: translateY(2%);
      background-color: white;
      color : grey
    }

  `;

  static properties = {
    count: { type: Number },
    minReached: { type: Boolean },
    maxReached: { type: Boolean },
    reset: { type: Boolean },
  };

  constructor() {
    super();
    this.count = 0;
    this.minReached = false;
    this.maxReached = false;
  }

  increment() {
    if (this.count < 15) {
      this.count += 1;
      this.minReached = false;
      this.maxReached = false;
      this.reset = false;
    } else {
      this.maxReached = true;
    }
  }

  decrement() {
    if (this.count > -15) {
      this.count -= 1;
      this.minReached = false;
      this.maxReached = false;
      this.reset = false;
    } else {
      this.minReached = true;
    }
  }

  restart() {
    this.count = 0;
    this.minReached = false;
    this.maxReached = false;
    this.reset = true;
  }

  render() {
    return html`
      <main>
        <input
          readonly
          value="${this.count}"
          class="counter__value"
          size="large"
        />
        <div class="counter__actions">
          <button @click="${this.decrement}" ?disabled="${this.minReached}"
            class="counter__button"
          > - </button>
          <button @click="${this.increment}" ?disabled="${this.maxReached}"
            class="counter__button"
          > + </button>
        </div>
        <div class="reset_actions">
          <button @click="${this.restart}"
            class="reset_button"
            @click="${this.restart}"
            >RESET</button
          >
        </div>
      </main>
    `;
  }
}

customElements.define('tally-main', TallyMain);