const Item = require("../models/itemModel");

exports.create = async (req, res, next) => {
  try {
    const body = req.body;
    const saveItem = await Item.create(body);
    return res.status(201).json(saveItem);
  } catch (error) {
    console.log(error);
  }
};

exports.get = async (req, res, next) => {
  try {
    const id = req.params.id;
    const item = await Item.findById(id);
    if (!item) return res.status(409).json({ msg: "Invalid iD" });
    return res.status(200).json(item);
  } catch (error) {
    console.log(error);
  }
};

exports.getAll = async (req, res, next) => {
  try {
    const items = await Item.find();
    return res.status(200).json(items);
  } catch (error) {
    console.log(error);
  }
};

exports.update = async (req, res, next) => {
  try {
    const id = req.params.is;
    const updateItem = await Item.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updateItem)
      return res.status(409).json({ msg: "Item Updation faild" });
    return res.status(200).json(updateItem);
  } catch (error) {
    console.log(error);
  }
};

exports.delete = async (req, res, next) => {
  try {
    const id = req.params.id;
    const deletItem = await Item.findByIdAndDelete(id);
    if (!deletItem) return res.status(409).json({ msg: "Item Deletion faild" });
    return res.status(200).json({ msg: "Item Deleted" });
  } catch (error) {
    console.log(error);
  }
};
