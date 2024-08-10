const express = require("express");
require("dotenv").config();
const ConnectDB = require("./config/ConnectDB");
const OrderRoutes = require("./Routes/OrderRoutes");
const OrderController = require("./Controllers/OrderController");
const consumeMessage = require("./config/RabbitMQ");

const app = express();

const port = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// connnect DB
ConnectDB();

app.use("/orders", OrderRoutes);

//listen to Queue
consumeMessage(OrderController.createOrder);

app.listen(port, () => {
  console.log(`order-service started on port ${port}`);
});
