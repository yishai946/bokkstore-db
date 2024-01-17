const bodyParser = require("body-parser");
const express = require("express");
const authorRouter = require("./routes/author");
const bookRouter = require("./routes/book");
const orderRouter = require("./routes/order");
const app = express();

app.use(bodyParser.json());

app.use("/api/author", authorRouter);
app.use("/api/book", bookRouter);
app.use("/api/order", orderRouter);

module.exports = app;
