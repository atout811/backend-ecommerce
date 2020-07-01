const { retrive, createDep } = require("./departmentController");

const depRouter = app => {
  app.get("/departments/:depName", retrive);
  app.post("/departments/:depName", createDep);
};

module.exports = depRouter;
