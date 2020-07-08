const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  Username: { type: String, minlength: 3, maxlength: 15, required: true },
  password: { type: String, minlength: 6, required: true },
  email: { type: String, required: true },
  kart: [
    {
      itemName: String,
      review: Number,
      description: String,
      price: Number,
      quantity: Number,
    },
  ],
});

userSchema.methods.generateAuthToken = async function () {
  const token = jwt.sign(
    {
      username: this.Username,
      password: this.password,
    },
    process.env.APP_KEY
  );

  return token;
};

module.exports = mongoose.model("User", userSchema);
