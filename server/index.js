const express = require("express");
const app = express();
const mongoose = require("mongoose");
const {MONGO_URI} = require("./keys");

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex:true
  })
  .then(() => console.log("DB Connection is successful"))
  .catch((err) => console.log(err));

app.use(express.json());

app.listen(9000, () => {
    console.log("backend server is running!");
});
