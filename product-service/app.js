const express = require("express");
const cookieParser = require("cookie-parser");
const ConnectDB = require("./config/ConnectDB");
require("dotenv").config();
const app = express();

const port = process.env.PORT || 3000;

//connect DB
ConnectDB();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.listen(port, () => {
  console.log(`product-server listening on port ${port}`);
});
