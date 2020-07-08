const User = require("./userModel");
const Department = require("../department/departmentModel");

const bcrypt = require("bcrypt");

const Controllers = {
  signup: async (req, res) => {
    try {
      //check user
      let user = await User.findOne({ Username: req.body.name });
      if (user) return res.status(400).send("This User is already taken");
      //create user
      user = await User({ Username: req.body.name, email: req.body.email });
      const crypted_pwd = await bcrypt.hash(req.body.password, 10);
      user.password = crypted_pwd;
      user = await user.save();
      //generate token
      const token = await user.generateAuthToken();
      console.log(token);
      //send success
      res.json({ value: true, token: token });
    } catch (e) {
      res.status(500).send(e.message);
    }
  },
  signin: async (req, res) => {
    try {
      let user = await User.findOne({ Username: req.body.name });
      if (!user) return res.status(400).send("Invaild Username or Password");
      const auth = await bcrypt.compare(req.body.password, user.password);
      if (!auth) return res.status(400).send("Invaild Username or Password");

      const token = await user.generateAuthToken();
      console.log(token);

      res.json({ token: token });
    } catch (e) {
      res.send(e.message);
    }
  },
  addToKart: async (req, res) => {
    let user = await User.findOne({ Username: req.params.me });
    if (!user) return res.status(400).send("Sign in to add to your kart");
    let department = await Department.findOne({
      depName: req.body.depName,
    });
    if (!department) return res.status(404).send("Choose Department");

    let item = department.items.find(
      item => item.itemName == req.body.itemName
    );
    if (!item) return res.send("This item isn't existed");
    console.log(user);
    let userItem = user.kart.find(item => item.itemName == req.body.itemName);
    if (userItem) {
      userItem.quantity += 1;
      await user.save();
      return res.send("your item added");
    }
    user.kart.push(item);
    await user.save();
    res.send("Item added to your kart successfuly");
  },
  showKart: async (req, res) => {
    let user = await User.findOne({ Username: req.params.me });
    if (!user) return res.status(400).send("Sign in to add to your kart");
    if (!user.kart.length) return res.send("no items to show");
    res.send(user.kart);
  },
};

module.exports = Controllers;
