const express = require("express");
const router = express.Router();
const { bookService } = require("../services/book");

// create a new book
router.post("/newBook", bookService.newBook);

// delete a book
router.delete("/deleteBook/:id", bookService.deleteBook);

// get all books
router.get("/books", bookService.getAllBooks)

// get books by value
router.get("/books/:value", bookService.getBooksByValue);

// get books by genres
router.get("/genre/:genre", bookService.getBooksByGenre);

// get books by publishing year range
router.get("/year/:startYear/:endYear", bookService.getBooksByYear);

// get books by author country
router.get("/country/:country", bookService.getBooksByCountry);


module.exports = router;