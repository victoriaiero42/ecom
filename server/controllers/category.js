const Category = require("../models/category");
const Sub = require("../models/subCat");
const slugify = require("slugify");
const { response } = require("express");

exports.create = async (req, res) => {
  try {
    const { name } = req.body;
    const category = await new Category({
      name,
      slug: slugify(name).toLowerCase(),
    }).save();
    res.json(category);
  } catch (error) {
    console.log(error);
    res.staturs(400).send("Create category failed");
  }
};

exports.list = async (req, res) => {
  const list = await Category.find({}).sort({ createdAt: -1 }).exec();
  res.json(list);
};

exports.update = async (req, res) => {
  const { name } = req.body;
  try {
    const updated = await Category.findOneAndUpdate(
      {
        slug: req.params.slug,
      },
      { name, slug: slugify(name) },
      { new: true }
    );
    res.json(updated);
  } catch (error) {
    res.status(400).send("Category update failed");
  }
};

exports.read = async (req, res) => {
  let category = await Category.findOne({ slug: req.params.slug }).exec();
  res.json(category);
};

exports.remove = async (req, res) => {
  try {
    const deleted = await Category.findOneAndDelete({
      slug: req.params.slug,
    }).exec();
    res.json(deleted);
  } catch (error) {
    response.status(400).send("Category delete failed");
  }
};

exports.getSubs = async (req, res) => {

  Sub.find({
    parent: req.params._id
  }).exec((err, subs) => {
    if (err) console.log(err);
    res.json(subs)
  })

};
