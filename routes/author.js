const express = require("express");
const router = express.Router();
const { authorService } = require("../services/author");

// create a new author
router.post("/newAuthor", authorService.newAuthor);

// update author
router.put("/updateAuthor/:id", authorService.updateAuthor);

// get all books by author
router.get("/books/:id", authorService.getBooksByAuthor);

module.exports = router;
