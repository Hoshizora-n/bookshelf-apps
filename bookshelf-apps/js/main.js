// first render
const keys = Object.keys(localStorage);
const books = keys.map((key) => {
    let book = localStorage.getItem(key);
    book = JSON.parse(book);
    return book;
});
books.forEach((book) => renderBook(book));
action();

// Input functions
const inputForm = document.getElementById("inputBook");
const inputTitle = document.getElementById("inputBookTitle");
const inputAuthor = document.getElementById("inputBookAuthor");
const inputYear = document.getElementById("inputBookYear");
const inputIsComplete = document.getElementById("inputBookIsComplete");
const submitBook = document.getElementById("bookSubmit");
// click enter to submit form
inputForm.addEventListener("keydown", (e) => {
    if (e.key == "Enter") {
        e.preventDefault();
        submitBook.click();
    }
});
// Change checkbox input text
inputIsComplete.addEventListener("click", () => {
    if (inputIsComplete.checked) submitBook.innerText = "Masukkan Buku ke rak Selesai dibaca";
    else submitBook.innerText = "Masukkan Buku ke rak Belum selesai dibaca";
});
// Add new book to local storage
submitBook.addEventListener("click", () => {
    if (inputTitle.value == "" || inputAuthor.value == "" || inputYear.value == "") return;
    else {
        const addBook = newBook(inputTitle.value, inputAuthor.value, parseInt(inputYear.value), inputIsComplete.checked);
        localStorage.setItem(addBook.id, JSON.stringify(addBook));
    }
});

// Search function
const searchForm = document.getElementById("searchBook");
// click enter to search
searchForm.addEventListener("keydown", (e) => {
    if (e.key == "Enter") {
        e.preventDefault();
        searchIcon.click();
    }
});
const searchBookTitle = document.getElementById("searchBookTitle");
const searchIcon = document.getElementById("search-icon");
searchIcon.addEventListener("click", () => {
    // Delete previous rendered book
    inCompleteBook.innerHTML = "";
    completeBook.innerHTML = "";
    books.forEach((book) => {
        // if search value is empty, render all book
        if (searchBookTitle.value == "") {
            renderBook(book);
            action(); // add action functionality
        }
        // if not render book based on search value
        else if (book.title.toLowerCase().includes(searchBookTitle.value.toLowerCase())) {
            renderBook(book);
            action(); // add action functionality
        }
    });
});
