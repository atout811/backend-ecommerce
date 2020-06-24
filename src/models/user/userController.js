const User = require("./userModel");
const bcrypt = require("bcrypt");

const signup = async (req, res) => {
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
};
const signin = async (req, res) => {
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
};

module.exports = { signup, signin };
