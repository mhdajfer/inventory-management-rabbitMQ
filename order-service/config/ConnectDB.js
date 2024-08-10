const mongoose = require("mongoose");

const ConnectDB = () => {
  mongoose
    .connect(process.env.DB_URL)
    .then(() => {
      console.log(`Connected to Database`);
    })
    .catch((err) => {
      console.log(`Error connecting to Database`, err);
    });
};

module.exports = ConnectDB;
