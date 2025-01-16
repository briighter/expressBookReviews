const express = require("express");
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

public_users.post("/register", (req, res) => {
  //Write your code here
  const username = req.body.username;
  const password = req.body.password;
  // Check if both username and password are provided
  if (username && password) {
    // Check if the user does not already exist
    if (!isValid(username)) {
      // Add the new user to the users array
      users.push({ username: username, password: password });
      return res
        .status(200)
        .json({ message: "User successfully registered. Now you can login" });
    } else {
      return res.status(404).json({ message: "User already exists!" });
    }
  }
  // Return error if username or password is missing
  return res.status(404).json({ message: "Unable to register user." });
});

// Get the book list available in the shop
public_users.get("/", function (req, res) {
  new Promise((resolve, reject) => {
    resolve(books);
  }).then((b) => {
    return res.status(200).send(b);
  });
});

// Get book details based on ISBN
public_users.get("/isbn/:isbn", function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
  new Promise((resolve, reject) => {
    if (!isbn) {
      reject("Invalid ISBN");
    }
    if (!books[isbn]) {
      reject("Book not found");
    }
    resolve(books[isbn]);
  }).then((response) => {
    return res.status(200).send(response);
  });
});

// Get book details based on author
public_users.get("/author/:author", function (req, res) {
  //Write your code here
  authorsBooks = [];
  new Promise((resolve, reject) => {
    if (!req.params.author) {
      reject("Invalid author");
    }
  
    for (let book in books) {
      if (books[book].author === req.params.author) {
        authorsBooks.push(books[book]);
      }
    }
  
    if (authorsBooks.length === 0) {
      reject("Author not found");
    }

    resolve(authorsBooks);
  }).then((response) => {
    return res.status(200).send(response);
  });
});

// Get all books based on title
public_users.get("/title/:title", function (req, res) {
  //Write your code here
  titledBooks = [];
  new Promise((resolve, reject) => {
    if (!req.params.title) {
      reject("Invalid title");
    }
  
    for (let book in books) {
      if (books[book].title === req.params.title) {
        titledBooks.push(books[book]);
      }
    }
  
    if (titledBooks.length === 0) {
      reject("Title not found");
    }
    
    resolve(titledBooks);
  }).then((response) => {
    return res.status(200).send(response);
  });
});

//  Get book review
public_users.get("/review/:isbn", function (req, res) {
  //Write your code here
  //Write your code here
  const isbn = req.params.isbn;
  if (!isbn) {
    return res.status(200).json({ message: "Invalid ISBN" });
  }
  if (!books[isbn]) {
    return res.status(200).json({ message: "Book not found" });
  }

  return res.status(200).send(books[isbn].reviews);
});

module.exports.general = public_users;
