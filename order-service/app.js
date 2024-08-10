const express = require("express");
require("dotenv").config();
const ConnectDB = require("./config/ConnectDB");
const OrderRoutes = require("./Routes/OrderRoutes");

const app = express();

const port = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// connnect DB
ConnectDB();

app.use("/orders", OrderRoutes);

app.listen(port, () => {
  console.log(`order-service started on port ${port}`);
});
