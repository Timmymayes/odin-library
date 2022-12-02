let myLibrary = [];
let bookList = document.getElementById("book-list");
let rowCounter = 0;
let newRow;
let mainButton = document.getElementById("main-btn");
let form = document.getElementById("form");

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

function toggleStatus(e) {
  //Toggle button status by calling prototype function
  let curBook = myLibrary[e.path[2].id];
  e.target.childNodes[0].nodeValue = curBook.toggleReadStatus();
}

Book.prototype.toggleReadStatus = function () {
  if (this.isRead === true) {
    this.isRead = false;
    return "Not Read";
  } else {
    this.isRead = true;
    return "Complete";
  }
  // eventually conver to a switch  https://www.w3schools.com/howto/howto_css_switch.asp
};

function addBookToLibrary(book) {
  // add book to array and grab the last element and add book to list
  myLibrary.push(book);
}

function addBookDataToRow(row, book) {
  Object.entries(book).forEach((entry) => {
    let td = document.createElement("td");
    const [key, value] = entry;
    td.classList.add(determineClassToAdd(key));
    if (isButton(key)) {
      td.appendChild(createStatusButton(value));
    } else {
      td.appendChild(document.createTextNode(value));
    }
    checkIfNeedsCenteredAndCenter(key);
    row.appendChild(td);
  });
}

function createStatusButton(buttonState) {
  let readStatus;
  let btn = document.createElement("button");
  btn.classList.add("readStatus");
  btn.appendChild(document.createTextNode(createButtonText(buttonState)));
  btn.addEventListener("click", toggleStatus);
  return btn;
}

function isButton(propertyName) {
  if (propertyName == "isRead") {
    return true;
  }
  return false;
}

function determineClassToAdd(propertyName) {
  if (propertyName === "isRead") {
    return "status";
  } else {
    return propertyName;
  }
}

function createButtonText(propertyValue) {
  if (propertyValue === true) {
    return "Complete";
  } else {
    return "Not Read";
  }
}

function checkIfNeedsCenteredAndCenter(tableData, propertyName) {
  if (propertyName === "page" || propertyName === "isRead") {
    tableData.classList.add("center");
  }
}

function createTableAndAddBook(book) {
  newRow = document.createElement("tr");
  addBookDataToRow(newRow, book);
  checkIfRowNeedsAltStyleAndAddClass(newRow, rowCounter);
  newRow.id = "Row_" + rowCounter;
  rowCounter++;
  bookList.appendChild(newRow);
  modal.style.display = "none";
  form.reset();
}

function checkIfRowNeedsAltStyleAndAddClass(row, rowNumber) {
  if (rowNumber % 2 != 0) {
    row.classList.add("alt");
  }
}

//take form data by short circuiting the default action
//then capture form data and create a book

form.addEventListener("submit", function (e) {
  e.preventDefault();
  let bookData = [];
  const submittedData = new FormData(form);

  for (const [key, value] of submittedData) {
    bookData.push(value);
    bookData;
  }
  //if the checkbox for read/not read passes a string
  //  if true and  it simply leaves the data off if not
  // so we test length and add the needed boolean.
  if (bookData.length < 4) {
    bookData.push(false);
    bookData;
  } else {
    bookData[3] = true;
  }
  //
  let bookToAdd = new Book(
    (author = bookData[0]),
    (title = bookData[1]),
    (pages = Number(bookData[2])),
    (isRead = bookData[3])
  );
  addBookToLibrary(bookToAdd);
  createTableAndAddBook(bookToAdd);
});

// Form modal creation
var modal = document.getElementById("addBookModal");
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

// add test books to library and load them on page

addBookToLibrary(book01);
addBookToLibrary(book02);
addBookToLibrary(book03);
addBookToLibrary(book04);

myLibrary.forEach((item) => {
  createTableAndAddBook(item);
});
