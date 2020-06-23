const mongoose = require("mongoose");
const express = require("express");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  Username: { type: String, minlength: 3, maxlength: 15, required: true },
  password: { type: String, minlength: 6, required: true },
  email: { type: String, required: true },
  kart: { type: mongoose.Schema.Types.ObjectId, ref: "Kart" },
});

userSchema.methods.generateAuthToken = async function () {
  const token = jwt.sign(
    {
      username: this.Username,
    },
    process.env.APP_KEY
  );
  console.log("auth here");
  return token;
};

module.exports = mongoose.model("User", userSchema);
