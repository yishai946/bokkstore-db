const dotenv = require("dotenv");
const mongoose = require("mongoose");
const app = require("./index");
dotenv.config();

const run = () => {
  try {
    mongoose.connect(process.env.CONNECTION_STRING, {
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true,
    dbName: "bookstore",
    });

    const db = mongoose.connection;

    db.on("error", console.error.bind(console, "Connection error:"));
    db.once("open", () => {
      console.log("Connected to the database");
    });

    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  } catch (err) {
    console.log(err);
  }
};

run();

process.on("SIGINT", () => {
  mongoose.connection.close(() => {
    console.log("MongoDB connection closed");
    process.exit(0);
  });
});
