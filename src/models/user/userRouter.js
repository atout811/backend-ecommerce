const { signup, signin, addToKart, showKart } = require("./userController");

const userRouter = app => {
  app.post("/signup", signup);
  app.post("/signin", signin);
  app.route("/:me/kart").post(addToKart).get(showKart);
};

module.exports = userRouter;
