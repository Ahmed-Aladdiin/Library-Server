const express = require("express");
const app = express();

// Connect to mongo using connection string
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();

const connectToMongo = async () => {
  try {
    await mongoose.connect(process.env.connection_string);
    console.log("connected to database...");
  } catch (error) {
    console.log("couldn't connect to database...");
    console.log(error.message)
  }
};
connectToMongo();
///////////////////////////////////////////

// Use middleware
app.use(express.json());

// Use routers

// userRouter
const userRouter = require("./routers/user.router");
app.use("/user", userRouter);

// bookRouter
const bookRouter = require("./routers/book.router");
app.use("/book", bookRouter);

app.listen(3000, (error) => {
  if (error) {
    console.log('Error starting server: ', error);
  } else {
    console.log('Server started');
  }
});