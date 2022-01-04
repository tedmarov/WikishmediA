
const form = document.querySelector('.js-search-form');

form.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
    // Stops relaoding when form info submitted
    event.preventDefault();
    // Value from input field
    const inputValue = document.querySelector('.js-search-input').value;
    // No whitespace
    const searchQuery = inputValue.trim();
    // Print value of SQ
    console.log(searchQuery)
}