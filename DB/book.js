const Book = require("../models/Book");

const bookDB = {
  newBook: async (booksData) => {
    try {
      const books = await Book.create(booksData);
      return books;
    } catch (err) {
      console.log(err);
      throw new Error("Error creating book(s)", err);
    }
  },

  findByAuthor: async (authorId) => {
    try {
      const books = await Book.find({ authors: authorId });
      return books;
    } catch (err) {
      console.log(err);
      throw new Error("Internal Server Error", err);
    }
  },

  deleteBook: async (bookId) => {
    try {
      await Book.findByIdAndDelete(bookId);
    } catch (err) {
      console.log(err);
      throw new Error("Internal Server Error", err);
    }
  },

  getAllBooks: async (skip, pageSize) => {
    try {
      const books = await Book.find().skip(skip).limit(pageSize);
      return books;
    } catch (err) {
      console.log(err);
      throw new Error("Internal Server Error", err);
    }
  },

  //   get books by value with pagination
  getBooksByValue: async (value, skip, pageSize) => {
    try {
      const books = await Book.find({ title: { $regex: value, $options: "i" } })
        .skip(skip)
        .limit(pageSize);
      return books;
    } catch (err) {
      console.log(err);
      throw new Error("Internal Server Error", err);
    }
  },

  //   get books by genres with pagination
  getBooksByGenre: async (genre, skip, pageSize) => {
    try {
      const books = await Book.find({ genres: { $in: [genre] } })
        .skip(skip)
        .limit(pageSize);
      return books;
    } catch (err) {
      console.log(err);
      throw new Error("Internal Server Error", err);
    }
  },

  //   get books by years range with pagination
  getBooksByYear: async (startYear, endYear, skip, pageSize) => {
    try {
      const books = await Book.find({
        publishingYear: { $gte: startYear, $lte: endYear },
      })
        .skip(skip)
        .limit(pageSize);
      return books;
    } catch (err) {
      console.log(err);
      throw new Error("Internal Server Error", err);
    }
  },

  // get books by country with pagination
  getBooksByCountry: async (country, skip, pageSize) => {
    try {
      const books = await Book.aggregate([
        {
          $lookup: {
            from: "authors",
            localField: "authors",
            foreignField: "_id",
            as: "authors",
          },
        },
        {
          $match: {
            "authors.country": country,
          },
        },
        { $skip: skip },
        { $limit: pageSize },
      ]);

      return books;
    } catch (err) {
      console.log(err);
      throw new Error("Internal Server Error", err);
    }
  },

  // check if book in supply
  checkBookInSupply: async (bookId, amount) => {
    try {
      const book = await Book.findById(bookId);
      return book.quantity >= amount;
    } catch (err) {
      console.log(err);
      throw new Error("Internal Server Error", err);
    }
  },

  // get book price
  getBookPrice: async (bookId) => {
    try {
      const book = await Book.findById(bookId);
      return book.price;
    } catch (err) {
      console.log(err);
      throw new Error("Internal Server Error", err);
    }
  },

  // decrease book quantity
  decreaseBookQuantity: async (bookId, amount) => {
    try {
      await Book.findByIdAndUpdate(
        bookId,
        { $inc: { quantity: -amount } },
      );
    } catch (err) {
      console.log(err);
      throw new Error("Internal Server Error", err);
    }
  },
};

module.exports = { bookDB };
