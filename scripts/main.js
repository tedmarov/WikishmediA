async function handleSubmit(event) {
    // Stops relaoding when form info submitted
    event.preventDefault();
    // Value from input field
    const inputValue = document.querySelector('.js-search-input').value;
    // No whitespace
    const searchQuery = inputValue.trim();
    // Print value of SQ
    console.log(searchQuery)
    
    try {
        const results = await searchWikishmedia(searchQuery);
        displayResults(results);
    }   catch (err) {
        console.log(err);
        alert('Failed to search WikishmediA :(');
    }
}

async function searchWikishmedia(searchQuery) {
    const endpoint = `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=20&srsearch=${searchQuery}`;
    const response = await fetch(endpoint);
    if (!response.ok) {
        throw Error(response.statusText);
    }
    const json = await response.json();
    return json;
}

function displayResults(results) {
    // References `.js-search-results` element
    const searchResults = document.querySelector('.js-search-results');

    // Iterate over the `search` array; each nested object in the array can be accessed through `result`
    results.query.search.forEach(result =>{ 
        const url = `https://en.wikipedia.org/?curid=${result.pageid}`;

        // Append the search result to the DOM
        searchResults.insertAdjacentHTML(
            'beforeend',
            `<div class="result-item">
                <h3 class="result-title">
                    <a href="${url}" target="_blank" rel="noopener">${result.title}</a>
                </h3>
                <a href="${url}" class="result-link" target="_blank" rel="noopener">${url}</a>
                <span class="result-snippet">${result.snippet}</span><br>
                </div>`
        );
    });
}

const form = document.querySelector('.js-search-form');
form.addEventListener('submit', handleSubmit);

