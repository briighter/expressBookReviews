const express = require("express");
const jwt = require("jsonwebtoken");
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username) => {
  //returns boolean
  //write code to check is the username is valid
};

const authenticatedUser = (username, password) => {
  //returns boolean
  //write code to check if username and password match the one we have in records.
};

//only registered users can login
regd_users.post("/login", (req, res) => {
  //Write your code here
  const user = req.body.user;
  const pass = req.body.pass;
  if (!user) {
    return res.status(404).json({ message: "Please provide a username" });
  }
  if (!pass) {
    return res.status(404).json({ message: "Please provide a password" });
  }

  userData = {
    username: user,
    password: pass,
  };

  // Generate JWT access token
  let accessToken = jwt.sign(
    {
      data: userData,
    },
    "access",
    { expiresIn: 60 * 60 }
  );
  // Store access token in session
  req.session.authorization = {
    accessToken,
  };
  return res.status(200).send("User successfully logged in");
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  // Get user data from the request object
  const user = req.user.data.username;

  const isbn = req.params.isbn;
  if (!isbn) {
    return res.status(200).json({ message: "Invalid ISBN" });
  }
  if (!books[isbn]) {
    return res.status(200).json({ message: "Book not found" });
  }

  let review = req.body.review;
  if (!review) {
    return res.status(200).json({ message: "Please provide a review" });
  }

  books[isbn].reviews[user] = review;
  return res.status(200).json({ message: "Review added successfully" });
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
