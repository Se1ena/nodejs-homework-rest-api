const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

const { ctrlWrapper } = require("../utils");

const { User } = require("../models/user");

const { HttpError } = require("../helpers/HttpError");

const {SECRET_KEY} = process.env;

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const result = await User.create({...req.body, password: hashPassword});

  res.status(201).json({
    email: result.email,
    password: result.password,
  });
};

const login = async(req, res) => {
  const {email, password} = req.body;
  const user = await User.findOne({email}); 
  if(!user){
    throw HttpError(401, "Email or password is wrong");
  };
  
  const passwordCompare = await bcrypt.compare(password, user.password);
  if(!passwordCompare){
    throw HttpError(401, "Email or password is wrong");
  }

  const payload = {
    id: user._id,

  }

  const token = jwt.sign(payload, SECRET_KEY, {expiresIn: "23h"});

  res.json({
    token,
  })
}

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
};