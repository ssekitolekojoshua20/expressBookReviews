const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
public_users.get('/',async function (req, res) {
  //Write your code here
    try {
    const getBookList = () => Promise.resolve(books);
    const bookList = await getBookList();
    res.status(200).send(JSON.stringify(bookList, null, 4));
  } catch (error) {
    res.status(500).json({ message: "Error retrieving books" });
  }
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',async function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
  try {
    const getBookByISBN = (id) => {
      return new Promise((resolve, reject) => {
        if (books[id]) resolve(books[id]);
        else reject("Book not found");
      });
    };
    const book = await getBookByISBN(isbn);
    res.status(200).json(book);
  } catch (error) {
    res.status(404).json({ message: error });
  }
 });
  
// Get book details based on author
public_users.get('/author/:author',async function (req, res) {
  //Write your code here
  const author = req.params.author;
  try {
    const getBooksByAuthor = (auth) => {
      return new Promise((resolve) => {
        let results = [];
        for (let id in books) {
          if (books[id].author === auth) {
            results.push(books[id]);
          }
        }
        resolve(results);
      });
    };
    const matchedBooks = await getBooksByAuthor(author);
    res.status(200).json(matchedBooks);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

// Get all books based on title
public_users.get('/title/:title',async function (req, res) {
  //Write your code here
  const title = req.params.title;
  try {
    const getBooksByTitle = (ttl) => {
      return new Promise((resolve) => {
        let results = [];
        for (let id in books) {
          if (books[id].title === ttl) {
            results.push(books[id]);
          }
        }
        resolve(results);
      });
    };
    const matchedBooks = await getBooksByTitle(title);
    res.status(200).json(matchedBooks);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
  if (books[isbn]) {
    res.status(200).json(books[isbn].reviews);
  } else {
    res.status(404).json({ message: "Book not found" });
  }
});

module.exports.general = public_users;
