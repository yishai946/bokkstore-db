const Order = require("../models/order");

const orderDB = {
  newOrder: async (items, total) => {
    const order = new Order({
      items: items,
      total: total,
    });
    return await order.save();
  },

  getMaxTotal: async (startDate, endDate) => {
    const maxOrder = await Order.aggregate([
      {
        $match: {
          date: {
            $gte: new Date(startDate),
            $lte: new Date(endDate),
          },
        },
      },
      {
        $sort: {
          total: -1,
        },
      },
      {
        $limit: 1,
      },
    ]);

    return maxOrder[0];
  },

  getTopGenres: (startDate, endDate) => {
    return Order.aggregate([
      {
        $match: {
          date: {
            $gte: new Date(startDate),
            $lte: new Date(endDate),
          },
        },
      },
      {
        $unwind: "$items",
      },
      {
        $lookup: {
          from: "books",
          localField: "items.book",
          foreignField: "_id",
          as: "book",
        },
      },
      {
        $unwind: "$book",
      },
      {
        $unwind: "$book.genres",
      },
      {
        $group: {
          _id: "$book.genres",
          total: {
            $sum: 1,
          },
        },
      },
      {
        $sort: {
          total: -1,
        },
      },
      {
        $limit: 3,
      },
    ]);
  },

  getSumTotal: async (startDate, endDate) => {
    const sumTotal = await Order.aggregate([
      {
        $match: {
          date: {
            $gte: new Date(startDate),
            $lte: new Date(endDate),
          },
        },
      },
      {
        $group: {
          _id: null,
          total: {
            $sum: "$total",
          },
        },
      },
    ]);

    return sumTotal[0];
  },

  getTopAuthors: async (startDate, endDate) => {
    const topAuthors = await Order.aggregate([
      {
        $match: {
          date: {
            $gte: new Date(startDate),
            $lt: new Date(endDate),
          },
        },
      },
      {
        $unwind: "$items",
      },
      {
        $group: {
          _id: "$items.book",
          totalAmount: {
            $sum: "$items.amount",
          },
        },
      },
      {
        $lookup: {
          from: "books",
          localField: "_id",
          foreignField: "_id",
          as: "bookDetails",
        },
      },
      {
        $unwind: "$bookDetails",
      },
      {
        $unwind: "$bookDetails.authors",
      },
      {
        $group: {
          _id: "$bookDetails.authors",
          amountAuthor: {
            $sum: "$totalAmount",
          },
        },
      },
      {
        $lookup: {
          from: "authors",
          localField: "_id",
          foreignField: "_id",
          as: "author",
        },
      },
      {
        $unwind: "$author",
      },
      {
        $sort: {
          amountAuthor: -1,
        },
      },
      {
        $limit: 5,
      },
    ]);

    return topAuthors;
  },
};

module.exports = {
  orderDB,
};
