const Kart = require("./kartModel");
const User = require("../user/userModel");
const Item = require("../item/itemModel");

const Controller = {
  addItems: async function (req, res) {
    try {
      //check user and item
      let user = await User.findOne({ Username: req.params.user });
      if (!user) return res.status(400).res("please create account first");
      let item = await Item.findOne({ name: req.body.name });
      if (!item.quantity) return res.status(400).send("this Item is sold out");
      // create or find kart for user
      let kart = await Kart.findOne({ owner: user._id });
      if (!kart) kart = await new Kart({ owner: user._id });
      //add item to the user kart
      kart.items.push(item);
      await kart.save();
      item.quantity -= 1;
      await item.save();
      res.status(200).send("Item Added to kart successfuly");
    } catch (e) {
      res.status(500).send(e.message);
    }
  },
};

module.exports = Controller;
