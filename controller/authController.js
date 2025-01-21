const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

exports.login = async (req, res, next) => {
  const { email, password } = req?.body;
  const user = await User.findOne({ email });
  if (!user || user.password != password)
    return res.status(401).json({ msg: "Invalid credential" });

  const accessToken = jwt.sign(
    { _id: user._id, email: user.email, role: user.role },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.TOKEN_EXPIREIN }
  );

  return res.status(200).json({
    msg: "User Login Successfully",
    accessToken,
  });
};
