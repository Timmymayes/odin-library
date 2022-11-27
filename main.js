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


// some test books
let book01 = new Book(
  author = "Donella Meadows";
  title = "Systems Thinking";
  pages = 500 ;
  isRead = false;
)

let book02 = new Book(
  author = "David Goggins";
  title = "Can't Hurt Me";
  pages = 800;
  isRead = true;
)

let book03 = new Book(
  author = "Seth Godin";
  title = "Purple Cow";
  pages = 450;
  isRead = false;
)
let book04 = new Book(
  author = "John Carmack";
  title = "Masters Of Doom";
  pages = 350;
  isRead = false;
)

addBookToLibrary(book01);
addBookToLibrary(book02);
addBookToLibrary(book03);
addBookToLibrary(book04);
