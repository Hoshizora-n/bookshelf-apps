// Create book to object function
const newBook = (title, author, year, isComplete) => {
    const book = {
        id: new Date().toISOString(),
        title: title,
        author: author,
        year: year,
        isComplete: isComplete,
    };
    return book;
};

// render book function
const inCompleteBook = document.getElementById("incompleteBookshelfList");
const completeBook = document.getElementById("completeBookshelfList");
const renderBook = (book) => {
    const bookProperties = `
                <div class="bookProperties">
                    <div class="idBuku">${book.id}</div>
                    <div class="judul">
                        <p>Judul</p>
                        <p class="judulBuku" style="font-weight: bold;">${book.title}</p style="font-weight: bold;">
                    </div>
                    <div class="penulis">
                        <p>Penulis</p>
                        <p class="penulisBuku">${book.author}</p>
                    </div>
                    <div class="tahun">
                        <p>Tahun</p>
                        <p class="tahunBuku">${book.year}</p>
                    </div>
                </div>`;

    if (book.isComplete === false) {
        inCompleteBook.innerHTML += `
            <article class="book_item">
                ${bookProperties}

                <div class="action">
                    <button class="done">Selesai dibaca</button>
                    <button class="edit">Edit</button>
                    <button class="delete">Hapus buku</button>
                </div>
            </article>`;
    } else {
        completeBook.innerHTML += `
            <article class="book_item">
                ${bookProperties}

                <div class="action">
                    <button class="undone">Belum selesai dibaca</button>
                    <button class="edit">Edit</button>
                    <button class="delete">Hapus buku</button>
                </div>
            </article>`;
    }
};

// actions functions
const actionElements = document.getElementsByClassName("action");
const editModal = document.getElementById("edit-modal");
const editSection = document.querySelector(".edit-section");
const action = () => {
    Array.from(actionElements).forEach((item) => {
        // Edit book
        const edit = item.querySelector(".edit");
        const bookItem = item.parentElement;
        const idBuku = bookItem.querySelector(".idBuku").innerText;
        const book = JSON.parse(localStorage.getItem(idBuku));
        const judulBuku = book.title;
        const penulisBuku = book.author;
        const tahunBuku = book.year;
        edit.addEventListener("click", () => {
            editModal.style.display = "block";
            editSection.innerHTML = `
            <form id="editBook">
                <div class="edit-header">
                    <h2>Edit</h2>
                    <h3 id="close-modal">&times;</h3>
                </div>
                <div class="edit">
                    <label for="editBookTitle">Judul</label>
                    <input id="editBookTitle" type="text" value="${judulBuku}" required />
                </div>
                <div class="edit">
                    <label for="editBookAuthor">Penulis</label>
                    <input id="editBookAuthor" type="text" value="${penulisBuku}" required />
                </div>
                <div class="edit">
                    <label for="editBookYear">Tahun</label>
                    <input id="editBookYear" type="number" value="${tahunBuku}" required />
                </div>
                <button id="bookSubmitEdit" type="submit">Selesai Edit Buku</button>
            </form>
            `;
            const closeSpan = document.getElementById("close-modal");
            closeSpan.addEventListener("click", () => {
                editModal.style.display = "none";
            });
            const bookSubmitEdit = document.getElementById("bookSubmitEdit");
            bookSubmitEdit.addEventListener("click", () => {
                const bookUpdate = {
                    id: book.id,
                    title: document.getElementById("editBookTitle").value,
                    author: document.getElementById("editBookAuthor").value,
                    year: document.getElementById("editBookYear").value,
                    isComplete: book.isComplete,
                };
                localStorage.setItem(bookUpdate.id, JSON.stringify(bookUpdate));
            });
        });
        // change status
        const statusAction = item.querySelector(".done") || item.querySelector(".undone");
        statusAction.addEventListener("click", () => {
            const bookUpdate = {
                id: book.id,
                title: book.title,
                author: book.author,
                year: book.year,
                isComplete: book.isComplete == true ? false : true,
            };
            localStorage.setItem(bookUpdate.id, JSON.stringify(bookUpdate));
            location.reload();
        });
        // delete book
        const deleteAction = item.querySelector(".delete");
        deleteAction.addEventListener("click", () => {
            localStorage.removeItem(book.id);
            location.reload();
        });
    });
};
