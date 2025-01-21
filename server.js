const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const { createAdmin } = require("./utils/helper");
const authRouter = require("./router/authRoute");
const userRouter = require("./router/userRoute");
const itemRouter = require("./router/itemRouter");

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/item", itemRouter);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Connected to MongoDB");
});

createAdmin();

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT} `);
});
