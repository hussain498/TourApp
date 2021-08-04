const USER = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const shortId = require("shortid");


exports.signup = async (req, res) => {
  USER.findOne({ email: req.body.email }).exec(async (err, user) => {
    if (user)
      return res.json({
        message: "User already registered",
      });
    const { firstName, lastName, email, password } = req.body;
    const hash_password = await bcryptjs.hash(password, 10);

    const _user = new USER({
      firstName,
      lastName,
      email,
      hash_password,
      userName: shortId.generate(),
    });
    _user.save((err, data) => {
      if (err) {
        return res.json({
          message: "Something went wrong",
        });
      }
      if (data) {
        return res.status(201).json({
          message: "New user created successfully......",
        });
      }
    });
  });
};

exports.signin = (req, res) => {
  USER.findOne({ email: req.body.email }).exec(async (err, user) => {
    if (user) {
      const isPassword = await user.authenticate(req.body.password);
      if (isPassword && user.role === "user") {
        const token = jwt.sign(
          { _id: user._id, role: user.role },
          process.env.JWT_SECRET,
          {
            expiresIn: "7d",
          }
        );
        const { _id, firstName, lastName, email, role, fullName } = user;
        res.status(201).json({
          token,
          user: {
            _id,
            firstName,
            lastName,
            email,
            role,
            fullName,
          },
        });
      } else {
        return res.json({ message: "Invalid Password" });
      }
    } else {
      return res.json({ message: "No User Existed With This Email" });
    }
  });
};
