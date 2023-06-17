
// /**
//  * The maximum that the tally counter can count to.
//  * @type {number} MAX_NUMBER
//  */
// const MAX_NUMBER = 15

// /**
//  * The minimum that the tally counter can count to.
//  * @type {number} MIN_NUMBER
//  */
// const MIN_NUMBER = -5

// /**
//  * Selector for the DOM element where the tally total is displayed.
//  * @type {HTMLInputElement} currentNumber
//  */
// const currentNumber = document.querySelector('[data-key="currentNumber"]');

// /**
//  * Selector for the DOM element with the subtract button.
//  * @type {HTMLButtonElement} subtract
//  */
// const subtract= document.querySelector('[data-key="subtract"]');

// /**
//  * Selector for the DOM element with the add button.
//  * @type {HTMLButtonElement} add
//  */
// const add = document.querySelector('[data-key="add"]');

// /**
//  * Event handler to check whether the subtract button is disabled, and if not, it will subtract
//  * 1 to the tally amount.
//  * @event subtractHandler
//  */
// const subtractHandler = () => {

//     /**
//      * Stores tally count value after subtraction.
//      * @type {number} newValue
//      */
//     const newValue = parseInt(currentNumber.value) - 1;
//     currentNumber.value = newValue;

//     if (add.disabled === true)
//     {
//         add.disabled = false;
//     };

//     if (newValue <= MIN_currentNumber)
//     {
//         subtract.disabled = true;
//     };

// };


// /**
//  * Event handler to check whether the add button is disabled, and if not, it will add
//  * 1 to the tally amount.
//  * @event addHandler
//  */
// const addHandler = () => {

//     /**
//      * Stores tally count valu after subtraction.
//      * @type {number} newValue
//      */
//     const newValue = parseInt(currentNumber.value) + 1;
//     currentNumber.value = newValue

//     if (subtract.disabled === true)
//     {
//         subtract.disabled = false;
//     };

//     if (newValue >= MAX_NUMBER)
//     {
//         add.disabled = true;
//     };
// };

// /**
//  * Decreases tally by 1.
//  * @fires subtractHandler
//  */
// subtract.addEventListener('click', subtractHandler);

// /**
//  * Increments tally by 1.
//  * @fires addHandler
//  */
// add.addEventListener('click', addHandler)


class TallyCounter extends HTMLElement {
    constructor() {
      super();
  
      // Create a shadow DOM for the web component
      this.attachShadow({ mode: 'open' });
  
      // Set up the initial counter value
      this.counterValue = 0;
  
      // Create the Shoelace components
      this.createComponents();
  
      // Attach event listeners
      this.addListeners();
    }
  
    // Create the Shoelace components and append them to the shadow DOM
    createComponents() {
      const wrapper = document.createElement('div');
      wrapper.innerHTML = `
        <sl-input data-key="currentNumber" class="counter__number" readonly value="0"></sl-input>
        <div class="counter__actions">
          <sl-button class="counter__button" data-key="subtract">-</sl-button>
          <sl-button class="counter__button" data-key="add">+</sl-button>
        </div>
      `;
      this.shadowRoot.appendChild(wrapper);
    }
  
    // Attach event listeners to the Shoelace components
    addListeners() {
      const currentNumber = this.shadowRoot.querySelector('[data-key="currentNumber"]');
      const subtract = this.shadowRoot.querySelector('[data-key="subtract"]');
      const add = this.shadowRoot.querySelector('[data-key="add"]');
  
      subtract.addEventListener('click', () => this.subtractHandler());
      add.addEventListener('click', () => this.addHandler());
    }
  
    // Handle subtract button click
    subtractHandler() {
      if (this.counterValue > MIN_NUMBER) {
        this.counterValue--;
        this.updateCounterDisplay();
      }
    }
  
    // Handle add button click
    addHandler() {
      if (this.counterValue < MAX_NUMBER) {
        this.counterValue++;
        this.updateCounterDisplay();
      }
    }
  
    // Update the counter display
    updateCounterDisplay() {
      const currentNumber = this.shadowRoot.querySelector('[data-key="currentNumber"]');
      currentNumber.value = this.counterValue;
    }
  
    // Define the observed attributes for the web component (if any)
    static get observedAttributes() {
      return [];
    }
  
    // Handle attribute changes (if any)
    attributeChangedCallback(name, oldValue, newValue) {
      // Handle attribute changes here (if any)
    }
  
    // Perform any necessary cleanup
    disconnectedCallback() {
      // Clean up event listeners here
    }
  }
  
  // Define the custom element using the web component
  customElements.define('tally-counter', TallyCounter);
  