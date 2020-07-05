const {
  retrive,
  createDep,
  addItem,
  deleteItem,
} = require("./departmentController");

const depRouter = app => {
  app.route("/departments/:depName").get(retrive).post(createDep);

  app
    .route("/departments/items/:itemName")
    .get(addItem)
    .post(addItem)
    .delete(deleteItem);
};

module.exports = depRouter;
