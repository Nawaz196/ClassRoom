const express = require("express");
const app = express();
const mongoose = require("mongoose");
const { MONGO_URI } = require("./config/keys");
const authRoute = require("./Routes/auth");
const subjectRoute= require('./Routes/subject')
const lectureRoute= require('./Routes/lecture')
const cors = require("cors");

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("DB Connection is successful"))
  .catch((err) => console.log(err));

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api", subjectRoute);
app.use("/api", lectureRoute)

app.listen(9000, () => {
  console.log("backend server is running!");
});
