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
  this.author = author;
  this.title = title;
  this.pages = pages;
  this.isRead = readStatus;
}

Book.prototype.toggleReadStatus = function () {
  if (this.isRead === true) {
    this.isRead = false;
    return "Not Read";
  } else {
    this.isRead = true;
    return "Complete";
  }
};

function toggleStatus(e) {
  let curBook = myLibrary[e.path[2].id];
  e.target.childNodes[0].nodeValue = curBook.toggleReadStatus();
  console.log(e.target.childNodes[0].nodeValue);
}

function addBookToLibrary(book) {
  // add book to array and grab the last element and add book to list
  myLibrary.push(book);
  console.log();
}

function addBookDataToRow(row, book) {
  Object.entries(book).forEach((entry) => {
    let td = document.createElement("td");
    const [key, value] = entry;
    let classToAdd = key;
    if (key === "isRead") {
      let readStatus;
      let btn = document.createElement("button");
      classToAdd = "status";
      if (value === true) {
        readStatus = "Complete";
      } else {
        readStatus = "Not Read";
      }
      console.log(typeof readStatus);
      btn.classList.add("readStatus");
      btn.appendChild(document.createTextNode(readStatus));
      // Commented out for now
      btn.addEventListener("click", toggleStatus);
      td.appendChild(btn);
      td.classList.add("center");
    } else {
      td.appendChild(document.createTextNode(value));
    }
    td.classList.add(classToAdd);
    if (key === "pages") {
      td.classList.add("center");
    }
    console.log(td);
    row.appendChild(td);
  });
}

// some test books
let book01 = new Book(
  (author = "Donella Meadows"),
  (title = "Systems Thinking"),
  (pages = 500),
  (isRead = false)
);

let book02 = new Book(
  (author = "David Goggins"),
  (title = "Can't Hurt Me"),
  (pages = 800),
  (isRead = true)
);

let book03 = new Book(
  (author = "Seth Godin"),
  (title = "Purple Cow"),
  (pages = 450),
  (isRead = false)
);
let book04 = new Book(
  (author = "John Carmack"),
  (title = "Masters Of Doom"),
  (pages = 350),
  (isRead = false)
);

addBookToLibrary(book01);
addBookToLibrary(book02);
addBookToLibrary(book03);
addBookToLibrary(book04);

let bookList = document.getElementById("book-list");
let newRow;
myLibrary.forEach((item) => {
  newRow = document.createElement("tr");
  console.log(newRow);
  addBookDataToRow(newRow, item);
  if (myLibrary.indexOf(item) % 2 != 0) {
    newRow.classList.add("alt");
  }
  newRow.id = myLibrary.indexOf(item);
  bookList.appendChild(newRow);
});
