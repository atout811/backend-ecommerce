const {
  retrive,
  createDep,
  addItem,
  deleteItem,
  updateItem,
} = require("./departmentController");

const depRouter = app => {
  app.route("/departments/:depName").get(retrive).post(createDep);

  app
    .route("/departments/items/:itemName")
    .get(addItem)
    .post(addItem)
    .delete(deleteItem)
    .put(updateItem);
};

module.exports = depRouter;
