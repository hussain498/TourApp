const USER = require("../../models/userModel");
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const shortId = require("shortid");

exports.signup = async (req, res) => {
  USER.findOne({ email: req.body.email }).exec(async (err, user) => {
    if (user)
      return res.status(400).json({
        message: "Admin already registered",
      });
    const { firstName, lastName, email, password } = req.body;
    const hash_password = await bcryptjs.hash(password, 10);
    const _user = new USER({
      firstName,
      lastName,
      email,
      hash_password,
      userName: shortId.generate(),
      role: "admin",
    });
    _user.save((err, data) => {
      if (err) {
        return res.status(400).json({
          message: "Something went wrong",
        });
      }
      if (data) {
        return res.status(201).json({
          message: "Admin created successfully..!",
        });
      }
    });
  });
};

exports.signin = (req, res) => {
  USER.findOne({ email: req.body.email }).exec(async (error, user) => {
    if (error) return res.status(400).json({ message: "errr" });
    if (user) {
      const isPassword = await user.authenticate(req.body.password);
      if (isPassword && user.role === "admin") {
        const token = jwt.sign(
          { _id: user._id, role: user.role },
          process.env.JWT_SECRET,
          {
            expiresIn: "7d",
          }
        );
        const { _id, firstName, lastName, email, role, fullName } = user;
        res.cookie("token", token, { expiresIn: "1h" });
        res.status(200).json({
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
        return res.status(400).json({ message: "Invalid Credentials" });
      }
    } else {
      return res.status(400).json({ message: "Invalid email" });
    }
  });
};

exports.signout = (req, res) => {
  res.clearCookie("token");
  res.status(200).json({
    message: "Signout successfully......!",
  });
};
