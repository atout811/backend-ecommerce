const { addItems } = require("./kartController");

const kartController = app => {
  app.post("/kart/:user", addItems);
};

module.exports = kartController;
