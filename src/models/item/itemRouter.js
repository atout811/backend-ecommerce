const { createItem } = require("./itemController");

const itemRouter = app => {
  app.post("/departments/:title/additem", createItem);
};

module.exports = itemRouter;
