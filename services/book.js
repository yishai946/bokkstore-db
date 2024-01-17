const { bookDB } = require("../DB/book");
const { authorDB } = require("../DB/author");

const bookService = {
  // new book(s)
  newBook: async (req, res) => {
    try {
      for (let i = 0; i < req.body.length; i++) {
        for (let j = 0; j < req.body[i].authors.length; j++) {
          console.log(req.body[i].authors[j]);
          const author = await authorDB.findById(req.body[i].authors[j]);
          if (!author) {
            throw new Error("Author not found");
          }
        }
      }
      const books = await bookDB.newBook(req.body);
      res.status(201).json({ books, message: "Book(s) created" });
    } catch (error) {
      console.log(error);
      res.status(400).send(error.message);
    }
  },

  // delete book
  deleteBook: async (req, res) => {
    const { id } = req.params;

    try {
      await bookDB.deleteBook(id);
      res.status(200).json({ message: "Book deleted" });
    } catch (err) {
      console.log(err);
      res.status(500).send("Internal Server Error");
    }
  },

  // get all books with pagination of 10
  getAllBooks: async (req, res) => {
    const { page } = req.query.page || 1;
    const { pageSize } = req.query.pageSize || 10;
    const skip = (page - 1) * pageSize;

    try {
      const books = await bookDB.getAllBooks(skip, pageSize);
      res.status(200).json({ books });
    } catch (err) {
      console.log(err);
      res.status(500).send("Internal Server Error");
    }
  },

  // get books by value with pagination of 10
  getBooksByValue: async (req, res) => {
      const { value } = req.params;
      const page = parseInt(req.query.page) || 1;
      const pageSize = parseInt(req.query.pageSize) || 10; // Use a default pageSize of 10
      const skip = (page - 1) * pageSize;

    try {
      const books = await bookDB.getBooksByValue(value, skip, pageSize);
      res.status(200).json({ books });
    } catch (err) {
      console.log(err);
      res.status(500).send("Internal Server Error");
    }
  },

  // get books by genres with pagination of 10
  getBooksByGenre: async (req, res) => {
    const { genre } = req.params;
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10; // Use a default pageSize of 10
    const skip = (page - 1) * pageSize;

    try {
      const books = await bookDB.getBooksByGenre(genre, skip, pageSize);
      res.status(200).json({ books });
    } catch (err) {
      console.log(err);
      res.status(500).send("Internal Server Error");
    }
  },

  // get books by publishing year range with pagination of 10
  getBooksByYear: async (req, res) => {
    const { startYear, endYear } = req.params;
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10; // Use a default pageSize of 10
    const skip = (page - 1) * pageSize;

    try {
      const books = await bookDB.getBooksByYear(startYear, endYear, skip, pageSize);
      res.status(200).json({ books });
    } catch (err) {
      console.log(err);
      res.status(500).send("Internal Server Error");
    }
  },

  getBooksByCountry: async (req, res) => {
    const { country } = req.params;
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10; // Use a default pageSize of 10
    const skip = (page - 1) * pageSize;

    try {
      const books = await bookDB.getBooksByCountry(country, skip, pageSize);
      res.status(200).json({ books });
    } catch (err) {
      console.log(err);
      res.status(500).send("Internal Server Error");
    }
  },

};

module.exports = { bookService };
