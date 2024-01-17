const { orderDB } = require("../DB/Orders");
const { bookDB } = require("../DB/book");

const orderService = {
  newOrder: async (req, res) => {
    try {
      const { items } = req.body;
      let total = 0;

      for (const item of items) {
        if (!(await bookDB.checkBookInSupply(item.book, item.amount))) {
          return res.status(400).send("Not enough books in supply");
        }
        total += (await bookDB.getBookPrice(item.book)) * item.amount;
      }

      const order = await orderDB.newOrder(items, total);

      for (const item of items) {
        await bookDB.decreaseBookQuantity(item.book, item.amount);
      }

      res.status(200).json({ message: "Order created", total, order });
    } catch (err) {
      console.log(err);
      res.status(500).send("Internal Server Error");
    }
  },

  getMaxTotal: async (req, res) => {
    try {
      const { startDate, endDate } = req.query;

      const maxTotal = await orderDB.getMaxTotal(startDate, endDate);

      if (maxTotal) {
        res.status(200).json({ maxTotal });
      } else {
        res.status(404).send("No orders found within the specified date range");
      }
    } catch (err) {
      console.log(err);
      res.status(500).send("Internal Server Error");
    }
  },

  getTopGenres: async (req, res) => {
    try {
      const { startDate, endDate } = req.query;

      const topGenres = await orderDB.getTopGenres(startDate, endDate);

      if (topGenres) {
        res.status(200).json({ topGenres });
      } else {
        res.status(404).send("No orders found within the specified date range");
      }
    } catch (err) {
      console.log(err);
      res.status(500).send("Internal Server Error");
    }
  },

  getSumTotal: async (req, res) => {
    try {
      const { startDate, endDate } = req.query;

      const sumTotal = await orderDB.getSumTotal(startDate, endDate);

      if (sumTotal) {
        res.status(200).json({ sumTotal });
      } else {
        res.status(404).send("No orders found within the specified date range");
      }
    } catch (err) {
      console.log(err);
      res.status(500).send("Internal Server Error");
    }
  }, 

  getTopAuthors: async (req, res) => {
    try {
      const { startDate, endDate } = req.query;

      const topAuthors = await orderDB.getTopAuthors(startDate, endDate);

      if (topAuthors) {
        res.status(200).json({ topAuthors });
      } else {
        res.status(404).send("No orders found within the specified date range");
      }
    } catch (err) {
      console.log(err);
      res.status(500).send("Internal Server Error");
    }
  }
};

module.exports = {
  orderService,
};
