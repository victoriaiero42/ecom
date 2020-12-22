const Sub = require("../models/subCat");
const slugify = require("slugify");
const { response } = require("express");

exports.create = async (req, res) => {
  try {
    const { name, parent } = req.body;
    const sub = await new Sub({
      name,
      parent,
      slug: slugify(name).toLowerCase(),
    }).save();
    res.json(sub);
  } catch (error) {
    console.log(error);
    res.status(400).send("Create sub failed");
  }
};

exports.list = async (req, res) => {
  const list = await Sub.find({}).sort({ createdAt: -1 }).exec();
  res.json(list);
};

exports.update = async (req, res) => {
  const { name, parent } = req.body;
  try {
    const updated = await Sub.findOneAndUpdate(
      {
        slug: req.params.slug,
      },
      { name, parent, slug: slugify(name) },
      { new: true }
    );
    res.json(updated);
  } catch (error) {
    res.status(400).send("Sub update failed");
  }
};

exports.read = async (req, res) => {
  let sub = await Sub.findOne({ slug: req.params.slug }).exec();
  res.json(sub);
};

exports.remove = async (req, res) => {
  try {
    const deleted = await Sub.findOneAndDelete({
      slug: req.params.slug,
    }).exec();
    res.json(deleted);
  } catch (error) {
    response.status(400).send("Sub delete failed");
  }
};
