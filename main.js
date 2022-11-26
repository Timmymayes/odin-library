let myLibrary = [];

function Book(author, title, pages, readStatus) {
  // Constructor
  /*
    Book Details:
-Author
-Title
-number of pages
-read status
-cover image
  */
  this.Author = author;
  this.title = title;
  this.pages = pages;
  this.isRead = readStatus;
}

Book.prototype.toggleReadStatus = function () {
  if (this.isRead === true) {
    this.isRead = false;
  } else {
    this.isRead = true;
  }
};

function addBookToLibrary(book) {
  // do stuff here
  myLibrary.push(book);
}
