/**
 * Tally Counter Redux Store and DOM Interaction
 *
 * This script sets up a Redux store to manage the state of a tally counter. It also interacts with the DOM
 * by updating the value displayed in the digit input based on the state changes in the store.
 */

// Initial state of the counter
const initialState = {
  count: 0,
};

// Action types for the counter actions
const ActionTypes = {
  SUBTRACT: 'SUBTRACT',
  ADDITION: 'ADDITION',
  RESET: 'RESET',
};

/**
 * Counter Reducer
 *
 * A pure function that handles the state updates based on the dispatched actions.
 */
const counterReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.SUBTRACT:
      return {
        ...state,
        count: state.count - 1,
      };
    case ActionTypes.ADDITION:
      return {
        ...state,
        count: state.count + 1,
      };
    case ActionTypes.RESET:
      return {
        ...state,
        count: 0,
      };
    default:
      return state;
  }
};

// Create the Redux store with the counter reducer
const store = Redux.createStore(counterReducer);

// Subscribe to store changes and update the DOM accordingly
store.subscribe(() => {
  const state = store.getState();
  htmlSelector.digit.value = state.count.toString();
});

// Dispatch actions based on button clicks
htmlSelector.subtract.addEventListener('click', () => {
  store.dispatch({ type: ActionTypes.SUBTRACT });
});

htmlSelector.add.addEventListener('click', () => {
  store.dispatch({ type: ActionTypes.ADDITION });
});

htmlSelector.resetButton.addEventListener('click', () => {
  store.dispatch({ type: ActionTypes.RESET });
});

// Retrieve references to DOM elements using data-key attributes
const htmlSelector = {
  digit: document.querySelector('[data-key="number"]'),
  subtract: document.querySelector('[data-key="subtract"]'),
  add: document.querySelector('[data-key="add"]'),
  resetButton: document.querySelector('[data-key="reset"]'),
};

// Output the initial state and subscribe to store changes
store.subscribe(() => {
  console.log(store.getState());
});

// Dispatch some initial actions to showcase the functionality
store.dispatch({ type: ActionTypes.SUBTRACT });
store.dispatch({ type: ActionTypes.ADDITION });
store.dispatch({ type: ActionTypes.RESET });
