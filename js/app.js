const searchBook = async () => {
    const searchField = document.getElementById('search-field');
    searchText = searchField.value;
    searchField.value = '';

    // Error handling on load data
    if (searchText === '') {
        alert('nai')
    } else {
        toggleSpinner('visible');
        toggleDisplayResult('hidden');
        const url = `https://openlibrary.org/search.json?q=${searchText}`;
        const res = await fetch(url);
        const data = await res.json();
        console.log(data.docs)
        displayBookResult(data.docs);

    }
}

// toggling spinner function
const toggleSpinner = (spinnerValue) => {
    document.getElementById('spinner').style.visibility = spinnerValue;
}

// toggling display function
const toggleDisplayResult = (resultValue) => {
    document.getElementById('total-result').style.visibility = resultValue;
    document.getElementById('search-result').style.visibility = resultValue;
}

// display function
const displayBookResult = (bookData) => {
    // displaying total result
    const totalSearchResult = document.getElementById('total-result');
    totalSearchResult.textContent = '';
    const resultDiv = document.createElement('div');
    resultDiv.innerHTML = `<h5 class=" text-center text-success fw-bold mb-5 " >Total ${searchText.toUpperCase()} Book found ${bookData.length}...</h5>`;
    totalSearchResult.appendChild(resultDiv);

    // Error handling on searched books
    if (bookData.length === 0) {
        alert('the searching book is not exist');
    }

    // to find the searched books
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';
    bookData.slice(0, 21).forEach((book) => {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card mb-3 h-100 p-3 shadow" style="max-width: 450px;">
            <div class="row g-0">
               <div class="col-md-4 ">
               <img src=" https://covers.openlibrary.org/b/id/${book.cover_i ? book.cover_i : -1}-M.jpg" class="img-fluid rounded-start" alt="image not found">
               </div>
               <div class="col-md-8">
                  <div class="card-body">
                     <h5 class=" fw-bold mb-4">${book.title}</h5>
                     <h6>Author: ${book.author_name}</h6>
                     <h6>Publisher: ${book.publisher}</h6>
                    <p >Year: ${book.first_publish_year}</p>
                </div>
               </div>
            </div>
        </div>
        `;
        searchResult.appendChild(div);
    });

    toggleSpinner('hidden')
    toggleDisplayResult('visible');
}