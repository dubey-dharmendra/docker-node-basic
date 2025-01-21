const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

exports.verifyJWT = async (req, res, next) => {
  try {
    const accessToken = req?.header("Authorization")?.replace("Bearer ", "");

    if (!accessToken) {
      return res.status(403).json({ msg: "Token Not Found" });
    }

    const decodedAccessToken = jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET
    );

    const user = await User.findById(decodedAccessToken?._id);

    if (!user || !user?.role) {
      return res.status(403).json({ msg: "Invalid Token" });
    }

    req.user = user;
    next();
  } catch (error) {
    if (
      error instanceof jwt.JsonWebTokenError ||
      error instanceof jwt.TokenExpiredError
    ) {
      return res.status(403).json({ msg: " Token Expired" });
    }
    return next(error);
  }
};

exports.checkRole = (roles) => async (req, res, next) => {
  !roles.includes(req.user.role)
    ? res
        .status(401)
        .json({ msg: "Sorry you do not have access to this route" })
    : next();
};
