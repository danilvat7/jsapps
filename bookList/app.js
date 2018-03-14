/*jshint esversion: 6 */

// Book Constructor
function Book(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}

// UI constructor
function UI() {}

// Add book to list
UI.prototype.addBookToList = (book) => {
    const list = document.getElementById('book-list');
    // Create tr element
    const row = document.createElement('tr');
    // insert cols
    row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="delete">X</a></td>
    `;

    list.appendChild(row);
};
// show Alerts
UI.prototype.showAlert = (msg, className) => {
    // create error msg
    const div = document.createElement('div');
    div.className = `alert ${className}`;
    div.appendChild(document.createTextNode(msg));

    // get parent
    const container = document.querySelector('.container');
    const form = document.getElementById('book-form');

    container.insertBefore(div, form);

    setTimeout(() => {
        div.remove();
    }, 3000);
}
// Delete book
UI.prototype.deleteBook = (target) => {
    if (target.className === 'delete') {
        target.parentElement.parentElement.remove();
    }
};
// clear fields
UI.prototype.clearFields = () => {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
};

//event listener for add book
document.getElementById('book-form').addEventListener('submit', (e) => {

    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const isbn = document.getElementById('isbn').value;

    const book = new Book(title, author, isbn);

    const ui = new UI();

    // validate
    if (title === '' || author === '' || isbn === '') {
        // Error alert
        ui.showAlert('Please fill in all fields', 'error');
    } else {
        // Add book to list
        ui.addBookToList(book);
        ui.showAlert('Book Added!', 'success');
        // clear firelds
        ui.clearFields();
    }

    e.preventDefault();
});

// event listener for delete
document.getElementById('book-list').addEventListener('click', (e) => {

    const ui = new UI();
    ui.deleteBook(e.target);
    ui.showAlert('Book Removed!', 'success');
    e.preventDefault();
});