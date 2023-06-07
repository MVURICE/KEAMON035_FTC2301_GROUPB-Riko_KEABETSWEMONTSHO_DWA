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


export const genreOptions = (genres) => {
    const genreHtml = document.createDocumentFragment();
    const firstGenreElement = document.createElement('option');
    firstGenreElement.value = 'any';
    firstGenreElement.innerText = 'All Genres';
    genreHtml.appendChild(firstGenreElement);
  
    for (const [id, name] of Object.entries(genres)) {
      const element = document.createElement('option');
      element.value = id;
      element.innerText = name;
      genreHtml.appendChild(element);
    }
  
    htmlSelector.searchGenres.appendChild(genreHtml);
  }

  export const authorOptions = (authors) => {
    const authorsHtml = document.createDocumentFragment();
    const firstAuthorElement = document.createElement('option');
    firstAuthorElement.value = 'any';
    firstAuthorElement.innerText = 'All Authors';
    authorsHtml.appendChild(firstAuthorElement);
  
    for (const [id, name] of Object.entries(authors)) {
      const element = document.createElement('option');
      element.value = id;
      element.innerText = name;
      authorsHtml.appendChild(element);
    }
  
    htmlSelector.searchAuthors.appendChild(authorsHtml);
  }

export const applyTheme =()=> {

    const prefersDarkTheme = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = prefersDarkTheme ? 'night' : 'day';
  
    if (theme === 'night') {
      document.querySelector('[data-settings-theme]').value = 'night';
      document.documentElement.style.setProperty('--color-dark', '255, 255, 255');
      document.documentElement.style.setProperty('--color-light', '10, 10, 20');
    } else {
      document.querySelector('[data-settings-theme]').value = 'day';
      document.documentElement.style.setProperty('--color-dark', '10, 10, 20');
      document.documentElement.style.setProperty('--color-light', '255, 255, 255');
    }
  }


export const updateListItems = (result) => {
    htmlSelector.listItems.innerHTML = '';
    const newItems = document.createDocumentFragment();
  
    for (const { author, id, image, title } of result.slice(0, BOOKS_PER_PAGE)) {
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
  
      newItems.appendChild(element);
    }
  
    htmlSelector.listItems.appendChild(newItems);

   
  }
  
  export const showMoreBtnStart =()=>{

    htmlSelector.listButton.innerText = `Show more (${books.length - BOOKS_PER_PAGE})`
    page ++;

  }


  export const handleListItemClick = (event) => {
    const pathArray = Array.from(event.path || event.composedPath());
    let active = null;
  
    for (const node of pathArray) {
      if (active) break;
  
      if (node?.dataset?.preview) {
        let result = null;
  
        for (const singleBook of books) {
          if (result) break;
          if (singleBook.id === node?.dataset?.preview) result = singleBook;
        }
  
        active = result;
      }
    }
  
    if (active) {
      htmlSelector.listActive.open = true;
      htmlSelector.listBlur.src = active.image;
      htmlSelector.listImage.src = active.image;
      htmlSelector.listTitle.innerText = active.title;
      htmlSelector.listSubtitle.innerText = `${authors[active.author]} (${new Date(
        active.published
      ).getFullYear()})`;
      document.querySelector('[data-list-description]').innerText =
        active.description;
    }
  };


export const handleListButtonClick = () => {
    const fragment = document.createDocumentFragment();
  
    for (const { author, id, image, title } of matches.slice(
      page * BOOKS_PER_PAGE,
      (page + 1) * BOOKS_PER_PAGE
    )) {
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
  
      fragment.appendChild(element);
    }
  
    htmlSelector.listButton.disabled =
      matches.length - page * BOOKS_PER_PAGE < 1;
  
    htmlSelector.listButton.innerHTML = `
      <span>Show more</span>
      <span class="list__remaining"> (${
        matches.length - page * BOOKS_PER_PAGE > 0
          ? matches.length - page * BOOKS_PER_PAGE
          : 0
      })</span>`;
  
    htmlSelector.listItems.appendChild(fragment);
  
    page += 1;
  };



export const handleSearchFormSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const filters = Object.fromEntries(formData);
    const result = [];
  
    for (const book of books) {
      let genreMatch = filters.genre === 'any';
  
      for (const singleGenre of book.genres) {
        if (genreMatch) break;
        if (singleGenre === filters.genre) {
          genreMatch = true;
        }
      }
  
      if (
        (filters.title.trim() === '' ||
          book.title.toLowerCase().includes(filters.title.toLowerCase())) &&
        (filters.author === 'any' || book.author === filters.author) &&
        genreMatch
      ) {
        result.push(book);
      }
    }
  
    page = 1;
    matches = result;
  
    if (result.length < 1) {
      htmlSelector.listMessage.classList.add('list__message_show');
    } else {
      htmlSelector.listMessage.classList.remove('list__message_show');
    }
  
    updateListItems(result);
  
    window.scrollTo({ top: 0, behavior: 'smooth' });
    htmlSelector.searchOverlay.open = false;
};
  