const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    index: 'text',
  },
  publishingYear: {
    type: Number,
    required: true,
  },
  genres: {
    type: [String],
    required: true,
  },
  authors: { type: [mongoose.Schema.Types.ObjectId], required: true },
  quantity: {
    type: Number, 
    required: true,
  },
  price: {
    type: Number, 
    required: true,
  },
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
