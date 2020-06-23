const { signup, signin } = require("./userController");

const userRouter = app => {
  app.post("/signup", signup);
  app.post("/signin", signin);
};

module.exports = userRouter;
