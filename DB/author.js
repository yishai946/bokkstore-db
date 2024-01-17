const Author = require("../models/Author");

const authorDB = {
  // new author
  newAuthor: async (data) => {
    try {
      const author = new Author(data);

      const savedAuthor = await author.save();

      return savedAuthor;
    } catch (error) {
      console.log(error);
      throw new Error("Error creating author", error);
    }
  },

  // update author
  updateAuthor: async (data, id) => {
    try {
      const { name, country } = data;

      const updated = await Author.findByIdAndUpdate(
        id,
        { name, country },
        { new: true }
      );

      if (!updated) {
        throw new Error("Author not found");
      }

      return updated;
    } catch (err) {
      console.log(err);
      throw new Error("Internal Server Error", err);
    }
  },

  // find author by id
  findById: (id) => {
    try {
      return Author.findById(id);
    } catch (err) {
      console.log(err);
      throw new Error("Internal Server Error", err);
    }
  },
};

module.exports = { authorDB };
