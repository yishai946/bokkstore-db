const { authorDB } = require("../DB/author");
const { bookDB } = require("../DB/book");

const authorService = {
  // new author
  newAuthor: (req, res) => {
    const author = req.body;
    try {
      authorDB.newAuthor(author);
      res.status(200).json({ message: "Author created" });
    } catch (err) {
      console.log(err);
      console.log(err);
      res.status(500).send("Internal Server Error");
    }
  },

  //   update author
  updateAuthor: async (req, res) => {
    const { id } = req.params;

    try {
      await authorDB.updateAuthor(req.body, id);
      res.status(200).json({ message: "Author updated" });
    } catch (err) {
      console.log(err);
      res.status(500).send("Internal Server Error");
    }
  },

  // get all author books
  getBooksByAuthor: async (req, res) => {
    const { id } = req.params;

    try {
      const author = await authorDB.findById(id);
      if (!author) {
        throw new Error("Author not found");
      }

      const books = await bookDB.findByAuthor(id);
      res.status(200).json({ books });
    } catch (err) {
      console.log(err);
      res.status(500).send("Internal Server Error");
    }
  },
};

module.exports = { authorService };
