const User = require("../models/userModel");

exports.create = async (req, res, next) => {
  try {
    const body = req.body;
    body.role = "User";
    const saveUser = await User.create(body);
    return res.status(201).json({ msg: "user created" });
  } catch (error) {
    return res.status(201).json({ msg: error.message });
  }
};

exports.get = async (req, res, next) => {
  try {
    const id = req.user.role == "Admin" ? req.params.id : req.user._id;
    const user = await User.findById(id);
    if (!user) return res.status(409).json({ msg: "Invalid iD" });
    return res.status(200).json(user);
  } catch (error) {
    return res.status(201).json({ msg: error.message });
  }
};

exports.getAll = async (req, res, next) => {
  try {
    const users = await User.find();
    return res.status(200).json(users);
  } catch (error) {
    return res.status(201).json({ msg: error.message });
  }
};

exports.update = async (req, res, next) => {
  try {
    const id = req.user.role == "Admin" ? req.params.id : req.user._id;
    const { name } = req.body;

    const updateUser = await User.findByIdAndUpdate(
      id,
      { name },
      {
        new: true,
        runValidators: true,
      }
    );
    if (!updateUser)
      return res.status(409).json({ msg: "User Updation faild" });
    return res.status(200).json(updateUser);
  } catch (error) {
    return res.status(201).json({ msg: error.message });
  }
};

exports.delete = async (req, res, next) => {
  try {
    const id = req.params.id;
    const deletUser = await User.findByIdAndDelete(id);
    if (!deletUser) return res.status(409).json({ msg: "User Deletion faild" });
    return res.status(200).json({ msg: "User Deleted" });
  } catch (error) {
    return res.status(201).json({ msg: error.message });
  }
};
