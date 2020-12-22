const Product = require('../models/product');
const slugify = require('slugify');

exports.create = async (req, res) => {
  try {
    console.log(req.body, 'req.body');
    req.body.slug = slugify(req.body.title);
    const newProduct = await new Product(req.body).save();
    console.log(newProduct);
    res.json(newProduct);
  } catch (error) {
    console.log(error);
    // res.staturs(400).send("Create category failed");
    res.status(400).json({
      err: err.message,
    })
  }
}

exports.read = async (req, res) => {
  let products = await Product.find({});
  res.json(products);
}