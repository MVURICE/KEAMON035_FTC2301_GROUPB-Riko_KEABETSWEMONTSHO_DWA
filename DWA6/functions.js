import { books, authors, genres, BOOKS_PER_PAGE } from './data.js'


export const htmlSelector ={

    listItems : document.querySelector('[data-list-items]'),
    searchGenres : document.querySelector('[data-search-genres]'),
    searchAuthors : document.querySelector('[data-search-authors]'),
    settingsTheme : document.querySelector('[data-settings-theme]'),
    listButton : document.querySelector('[data-list-button]'),
    searchCancel : document.querySelector('[data-search-cancel]'),
    searchOverlay : document.querySelector('[data-search-overlay]'),
    settingsCancel:  document.querySelector('[data-settings-cancel]'),
    settingsOverlay : document.querySelector('[data-settings-overlay]'),
    settingsForm : document.querySelector('[data-settings-form]'),
    listClose : document.querySelector('[data-list-close]'),
    listActive : document.querySelector('[data-list-active]'),
    headerSearch :document.querySelector(`[data-header-search]`),
    searchTitle : document.querySelector('[data-search-title]'),
    searchForm :  document.querySelector('[data-search-form]'),
    listMessage : document.querySelector('[data-list-message]'),
    headerSettings : document.querySelector("[data-header-settings]"),
    listBlur : document.querySelector('[data-list-blur]'),
    listImage : document.querySelector('[data-list-image]'),
    listTitle :document.querySelector('[data-list-title]'),
    listSubtitle : document.querySelector('[data-list-subtitle]')
    


}


// export const genreOptions = (genres) => {
//     const genreHtml = document.createDocumentFragment();
//     const firstGenreElement = document.createElement('option');
//     firstGenreElement.value = 'any';
//     firstGenreElement.innerText = 'All Genres';
//     genreHtml.appendChild(firstGenreElement);
  
//     for (const [id, name] of Object.entries(genres)) {
//       const element = document.createElement('option');
//       element.value = id;
//       element.innerText = name;
//       genreHtml.appendChild(element);
//     }
  
//     htmlSelector.searchGenres.appendChild(genreHtml);
//   }


/**
 * Populate genre options in the search form.
 *
 * @param {Object} genres - Object containing genre data, where keys are genre IDs and values are genre names.
 */
export const genreOptions = (genres) => {
    /**
     * Creates genre options as HTML elements and appends them to the search form.
     *
     * @type {DocumentFragment} - Document fragment to store the genre options.
     */
    const genreHtml = document.createDocumentFragment();
  
    /**
     * Creates the first genre option for "All Genres" and appends it to the document fragment.
     *
     * @type {HTMLOptionElement} - HTML option element representing "All Genres".
     */
    const firstGenreElement = document.createElement('option');
    firstGenreElement.value = 'any';
    firstGenreElement.innerText = 'All Genres';
    genreHtml.appendChild(firstGenreElement);
  
    /**
     * Iterates over the genre data and creates genre options as HTML elements based on the genre ID and name.
     * Each genre option is then appended to the document fragment.
     */
    for (const [id, name] of Object.entries(genres)) {
      /**
       * Creates a genre option element and sets its value and inner text based on the genre ID and name.
       *
       * @type {HTMLOptionElement} - HTML option element representing a genre.
       */
      const element = document.createElement('option');
      element.value = id;
      element.innerText = name;
      genreHtml.appendChild(element);
    }
  
    htmlSelector.searchGenres.appendChild(genreHtml);
  };
  


/**
 * Populate author options in the search form.
 *
 * @param {Object} authors - Object containing author data, where keys are author IDs and values are author names.
 */
export const authorOptions = (authors) => {
    /**
     * Creates author options as HTML elements and appends them to the search form.
     *
     * @type {DocumentFragment} - Document fragment to store the author options.
     */
    const authorsHtml = document.createDocumentFragment();
  
    /**
     * Creates the first author option for "All Authors" and appends it to the document fragment.
     *
     * @type {HTMLOptionElement} - HTML option element representing "All Authors".
     */
    const firstAuthorElement = document.createElement('option');
    firstAuthorElement.value = 'any';
    firstAuthorElement.innerText = 'All Authors';
    authorsHtml.appendChild(firstAuthorElement);
  
    /**
     * Iterates over the author data and creates author options as HTML elements based on the author ID and name.
     * Each author option is then appended to the document fragment.
     */
    for (const [id, name] of Object.entries(authors)) {
      /**
       * Creates an author option element and sets its value and inner text based on the author ID and name.
       *
       * @type {HTMLOptionElement} - HTML option element representing an author.
       */
      const element = document.createElement('option');
      element.value = id;
      element.innerText = name;
      authorsHtml.appendChild(element);
    }
  
    htmlSelector.searchAuthors.appendChild(authorsHtml);
  };
  





/**
 * Apply the theme based on the user's preference or default theme.
 */
export const applyTheme = () => {
    /**
     * Check if the user's preferred color scheme is dark.
     *
     * @type {boolean} - Indicates whether the user prefers dark theme.
     */
    const prefersDarkTheme = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  
    /**
     * Determine the theme based on the user's preference or default to 'day' theme.
     *
     * @type {string} - The selected theme ('night' or 'day').
     */
    const theme = prefersDarkTheme ? 'night' : 'day';
  
    /**
     * Set the value of the theme select element in the settings form.
     *
     * @type {HTMLOptionElement} - The theme select element.
     */
    document.querySelector('[data-settings-theme]').value = theme;
  
    /**
     * Apply the corresponding CSS variables to set the color scheme.
     */
    if (theme === 'night') {
      document.documentElement.style.setProperty('--color-dark', '255, 255, 255');
      document.documentElement.style.setProperty('--color-light', '10, 10, 20');
    } else {
      document.documentElement.style.setProperty('--color-dark', '10, 10, 20');
      document.documentElement.style.setProperty('--color-light', '255, 255, 255');
    }
};
  

/**
 * Updates the list items container with new book preview elements based on the search result.
 * Clears the existing list items.
 * Creates and appends preview elements for each book in the result to a document fragment.
 * Appends the document fragment to the list items container.
 *
 * @param {Object[]} result - Array of book objects to display as previews.
 */
export const updateListItems = (result) => {
    /**
     * Clears the existing list items in the list items container.
     */
    htmlSelector.listItems.innerHTML = '';
  
    /**
     * A document fragment used to efficiently append multiple elements to the DOM.
     *
     * @type {DocumentFragment}
     */
    const newItems = document.createDocumentFragment();
  
    // Loop through each book in the result to create and append preview elements
    for (const { author, id, image, title } of result.slice(0, BOOKS_PER_PAGE)) {
      /**
       * Creates a button element for each book preview.
       *
       * @type {HTMLButtonElement}
       */
      const element = document.createElement('button');
      element.classList = 'preview';
      element.setAttribute('data-preview', id);
  
      element.innerHTML = `
        <img class="preview__image" src="${image}" />
        <div class="preview__info">
          <h3 class="preview__title">${title}</h3>
          <div class="preview__author">${authors[author]}</div>
        </div>
      `;
  
      // Append each preview element to the document fragment
      newItems.appendChild(element);
    }
  
    // Append the document fragment to the list items container
    htmlSelector.listItems.appendChild(newItems);
  };
  




  