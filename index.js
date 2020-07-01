const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

//Configuration
const port = process.env.PORT || 3000;
const connect = async () => {
  try {
    await mongoose.connect("mongodb://localhost/test", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (error) {
    console.log(`Couldn't connect due to ${error}`);
  }
};
const start = async () => {
  await connect();
  app.listen(port, () => console.log(`Connected to ${port}`));
};

//MiddleWare
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
//router
require("./src/models/user/userRouter")(app);
require("./src/models/department/departmentRouter")(app);
require("./src/models/item/itemRouter")(app);
require("./src/models/kart/kartRouter")(app);

//start server
start();
