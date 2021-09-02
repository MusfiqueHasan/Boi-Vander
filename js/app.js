const searchBook = async () => {
    const searchField = document.getElementById('search-field');
    searchText = searchField.value;
    const url = `https://openlibrary.org/search.json?q=${searchText}`
    const res = await fetch(url);
    const data = await res.json();
    console.log(data.docs)
    displayBookResult(data.docs)

}

searchBook()

const displayBookResult = (bookData) => {


    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';  
  
    bookData.forEach((book) => {

        
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card mb-3" style="max-width: 450px;">
             <div class="row g-0">
               <div class="col-md-4 ">
               <img src=" https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="img-fluid rounded-start" alt="...">
               </div>
               <div class="col-md-8">
                  <div class="card-body">
                     <h4 class=" fw-bold">${book.title}</h4>
                     <h6>Author: ${book.author_name}</h6>
                     <h6>Publisher: ${book.publisher}</h6>
                    <p >Year: ${book.first_publish_year}</p>
                </div>
               </div>
             </div>
        </div>
        `
        searchResult.appendChild(div)

    })

    console.log(bookData.length);
    

}