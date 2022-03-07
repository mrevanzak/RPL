const express = require("express");
const app = express();
const products = require("./routes/products");
require("dotenv").config();
const connectDB = require("./db/connect");

const port = process.env.PORT || 3000;
app.use(express.json());
app.use("/api/v1/products", products);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`server is listening on port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
