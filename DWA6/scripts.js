import { books, authors, genres, BOOKS_PER_PAGE } from './data.js'
import { htmlSelector,genreOptions, authorOptions, applyTheme,updateListItems,showMoreBtnStart } from './functions.js';



let page = 1;
let matches = books


htmlSelector.listButton.innerText = `Show more (${books.length - BOOKS_PER_PAGE})`
page ++;

// showMoreBtnStart()

const bookPreviews = (books) => {
    const starting = document.createDocumentFragment();
  
    for (const { author, id, image, title } of matches.slice(0, BOOKS_PER_PAGE)) {
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
  
      starting.appendChild(element);
    }
  
    htmlSelector.listItems.appendChild(starting);
}

bookPreviews(books)
  
genreOptions(genres);
  
authorOptions(authors);
  
applyTheme();



htmlSelector.searchCancel.addEventListener('click', () => {
    htmlSelector.searchOverlay.open = false
})

htmlSelector.settingsCancel.addEventListener('click', () => {
    htmlSelector.settingsOverlay.open = false
})

htmlSelector.headerSearch.addEventListener('click', () => {
    htmlSelector.searchOverlay.open = true 
    htmlSelector.searchTitle.focus()
})

htmlSelector.headerSettings.addEventListener('click', () => {
    htmlSelector.settingsOverlay.open = true 
})

htmlSelector.listClose.addEventListener('click', () => {
    htmlSelector.listActive.open = false
})



htmlSelector.settingsForm.addEventListener('submit', (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)
    const { theme } = Object.fromEntries(formData)

    if (theme === 'night') {
        document.documentElement.style.setProperty('--color-dark', '255, 255, 255');
        document.documentElement.style.setProperty('--color-light', '10, 10, 20');
    } else {
        document.documentElement.style.setProperty('--color-dark', '10, 10, 20');
        document.documentElement.style.setProperty('--color-light', '255, 255, 255');
    }
    
    htmlSelector.settingsOverlay.open = false
})

htmlSelector.searchForm.addEventListener('submit', (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)
    const filters = Object.fromEntries(formData)
    const result = []

    for (const book of books) {
        let genreMatch = filters.genre === 'any'

        for (const singleGenre of book.genres) {
            if (genreMatch) break;
            if (singleGenre === filters.genre) { genreMatch = true }
        }

        if (
            (filters.title.trim() === '' || book.title.toLowerCase().includes(filters.title.toLowerCase())) && 
            (filters.author === 'any' || book.author === filters.author) && 
            genreMatch
        ) {
            result.push(book)
        }
    }

    page = 1;
    matches = result

    if (result.length < 1) {
        htmlSelector.listMessage.classList.add('list__message_show')
    } else {
        htmlSelector.listMessage.classList.remove('list__message_show')
    }

    
    updateListItems(result);
      
    window.scrollTo({top: 0, behavior: 'smooth'});
    htmlSelector.searchOverlay.open = false
})



htmlSelector.listButton.addEventListener('click', () => {
    const fragment = document.createDocumentFragment()

    for (const { author, id, image, title } of matches.slice(page * BOOKS_PER_PAGE, (page + 1) * BOOKS_PER_PAGE)) {
        const element = document.createElement('button')
        element.classList = 'preview'
        element.setAttribute('data-preview', id)
    
        element.innerHTML = `
            <img
                class="preview__image"
                src="${image}"
            />
            
            <div class="preview__info">
                <h3 class="preview__title">${title}</h3>
                <div class="preview__author">${authors[author]}</div>
            </div>
        `

        fragment.appendChild(element)
    }

    htmlSelector.listButton.disabled = (matches.length - (page * BOOKS_PER_PAGE)) < 1

    htmlSelector.listButton.innerHTML = `
    <span>Show more</span>
    <span class="list__remaining"> (${(matches.length - (page * BOOKS_PER_PAGE)) > 0 ? (matches.length - (page * BOOKS_PER_PAGE)) : 0})</span>`

    htmlSelector.listItems.appendChild(fragment)
   
    page += 1
})



htmlSelector.listItems.addEventListener('click', (event) => {
    const pathArray = Array.from(event.path || event.composedPath())
    let active = null

    for (const node of pathArray) {
        if (active) break

        if (node?.dataset?.preview) {
            let result = null
    
            for (const singleBook of books) {
                if (result) break;
                if (singleBook.id === node?.dataset?.preview) result = singleBook
            } 
        
            active = result
        }
    }
    
    if (active) {
        htmlSelector.listActive.open = true
        htmlSelector.listBlur.src = active.image
        htmlSelector.listImage.src = active.image
        htmlSelector.listTitle.innerText = active.title
        htmlSelector.listSubtitle.innerText = `${authors[active.author]} (${new Date(active.published).getFullYear()})`
        document.querySelector('[data-list-description]').innerText = active.description
    }
})


