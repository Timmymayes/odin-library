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

  this.title = title;
  this.author = author;
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
  // https://www.w3schools.com/howto/howto_css_switch.asp
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
    console.log(key, ":", value);
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
    row.appendChild(td);
  });
}

function createTableAndAddBook(book) {
  newRow = document.createElement("tr");
  addBookDataToRow(newRow, book);
  if (rowCounter % 2 != 0) {
    newRow.classList.add("alt");
  }
  newRow.id = rowCounter;
  rowCounter++;
  bookList.appendChild(newRow);
  modal.style.display = "none";
  form.reset();
}

// function addNewBook(e) {
//   console.log(e);
//   e.preventDefault();
//   const data = new FormData(form);
// }

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
let rowCounter = 0;
let newRow;
let mainButton = document.getElementById("main-btn");
let form = document.getElementById("form");
form.addEventListener("submit", function (e) {
  e.preventDefault();
  let result = [];
  const data = new FormData(form);
  /*

A long ass

comment
oh yeah
*/
  for (const [key, value] of data) {
    result.push(value);
    console.log(result);
  }
  if (result.length < 4) {
    result.push(false);
    console.log(result);
  } else {
    result[3] = true;
  }
  let bookToAdd = new Book(
    (title = result[1]),
    (author = result[0]),
    (pages = Number(result[2])),
    (isRead = result[3])
  );
  console.log(bookToAdd);
  addBookToLibrary(bookToAdd);
  createTableAndAddBook(bookToAdd);
});

myLibrary.forEach((item) => {
  newRow = document.createElement("tr");
  addBookDataToRow(newRow, item);
  if (rowCounter % 2 != 0) {
    newRow.classList.add("alt");
  }
  newRow.id = rowCounter;
  bookList.appendChild(newRow);
  rowCounter++;
});

var modal = document.getElementById("myModal");
var span = document.getElementsByClassName("close")[0];
mainButton.onclick = function () {
  modal.style.display = "block";
};
span.onclick = function () {
  modal.style.display = "none";
};

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
