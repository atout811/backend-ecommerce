const { retrive, createDep } = require("./departmentController");

const depRouter = app => {
  app.get("/:title", retrive);
  app.post("/:title", createDep);
};

module.exports = depRouter;
