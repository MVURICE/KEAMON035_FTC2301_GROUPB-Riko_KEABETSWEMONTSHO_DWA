/**
 * HTML Selector Object
 *
 * An object containing references to various HTML elements identified by their data-key attribute.
 */
const htmlSelector = {
  digit: document.querySelector('[data-key="number"]'),
  subtract: document.querySelector('[data-key="subtract"]'),
  add: document.querySelector('[data-key="add"]'),
  resetButton: document.querySelector('[data-key="reset"]'),
};

/**
 * Subtract Button Event Listener
 *
 * Decreases the value of the digit input by 1 when the subtract button is clicked.
 */
htmlSelector.subtract.addEventListener('click', () => {
  const newValue = parseInt(htmlSelector.digit.value, 10) -1;
  htmlSelector.digit.value = newValue;
});

/**
 * Add Button Event Listener
 *
 * Increases the value of the digit input by 1 when the add button is clicked.
 */
htmlSelector.add.addEventListener('click', () => {
  const newValue = parseInt(htmlSelector.digit.value, 10) + 1;
  htmlSelector.digit.value = newValue;
});

/**
 * Reset Button Event Listener
 *
 * Resets the value of the digit input to 0 when the reset button is clicked.
 */
htmlSelector.resetButton.addEventListener('click', () => {
  htmlSelector.digit.value = 0;
});
