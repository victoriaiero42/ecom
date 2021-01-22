const Product = require("../models/product");
const User = require("../models/user");
const slugify = require("slugify");

exports.create = async (req, res) => {
  try {
    req.body.slug = slugify(req.body.title);
    const newProduct = await new Product(req.body).save();

    res.json(newProduct);
  } catch (error) {
    console.log(error);
    // res.staturs(400).send("Create category failed");
    res.status(400).json({
      err: err.message,
    });
  }
};

exports.listAll = async (req, res) => {
  let products = await Product.find()
    .limit(parseInt(req.params.count))
    .populate("category")
    .populate("subs")
    .sort([["createdAt", "desc"]])
    .exec();
  res.json(products);
};

exports.remove = async (req, res) => {
  try {
    const deleted = await Product.findOneAndDelete({
      slug: req.params.slug,
    }).exec();

    res.json(deleted);
  } catch (err) {
    console.log(err);
    res.status(400).send("product delete failed");
  }
};

exports.read = async (req, res) => {
  const product = await Product.findOne({ slug: req.params.slug })
    .populate("category")
    .populate("subs")
    .exec();
  res.json(product);
};

exports.update = async (req, res) => {
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }
    const updated = await Product.findOneAndUpdate(
      { slug: req.params.slug },
      req.body,
      { new: true }
    ).exec();
    res.json(updated);
  } catch (error) {
    console.log("PRDUCT UPDATE ERROR ======>>>", error);
    // return res.status(400).send("product update failed");
    res.status(400).json({
      error: error.message,
    });
  }
};

// exports.list = async (req, res) => {
//   try {
//     const { sort, order, limit } = req.body;
//     const products = await Product.find({})
//       .populate('category')
//       .populate('subs')
//       .sort([[sort, order]])
//       .limit(limit)
//       .exec()

//     res.json(products);
//   } catch (err) {
//     console.log(err);
//   }
// }

exports.list = async (req, res) => {
  try {
    const { sort, order, page } = req.body;

    const currentPage = page || 1;

    const perPage = 3;

    const products = await Product.find({})
      .skip((currentPage - 1) * perPage)
      .populate("category")
      .populate("subs")
      .sort([[sort, order]])
      .limit(perPage)
      .exec();

    res.json(products);
  } catch (err) {
    console.log(err);
  }
};

exports.productsCount = async (req, res) => {
  let total = await Product.find({}).estimatedDocumentCount().exec();
  res.json(total);
};

exports.productStar = async (req, res) => {
  const product = await Product.findById(req.params.productId).exec();
  const user = await User.findOne({ email: req.user.email }).exec();
  const { star } = req.body;

  let existingRatingObject = product.rating.find(
    (e) => e.postedBy.toString() === user._id.toString()
  );
  // console.log('existingRatingObject', existingRatingObject);
  console.log(product._id, star, user._id);

  if (existingRatingObject === undefined) {
    let ratingAdded = await Product.findByIdAndUpdate(
      product._id,
      {
        $push: { rating: { star: star, postedBy: user._id } },
      },
      { new: true }
    ).exec();
    console.log('ratingAdded', ratingAdded);
    res.json(ratingAdded);
  } else {

    const ratingUpdated = await Product.updateOne(
      { ratings: { $elemMatch: existingRatingObject } },
      { $set: { "raitings.$.star": star } },
      { new: true }
    ).exec();
    console.log('ratingUpdated', ratingUpdated);
    res.json(ratingUpdated);
  }
};

exports.relatedProducts = async (req, res) => {
  const { productId } = req.params;

  const product = await Product.findById(productId).exec();
  const related = await Product.find({
    _id: { $ne: product._id },
    category: product.category,
  })
    .limit(3)
    .populate("category")
    .populate("subs")
    .populate("postedBy")
    .exec();

  res.json(related)
}

const handleQuery = async (req, res, query) => {
  const products = await Product.find({ $text: { $search: query } })
    .populate('category', "_id name")
    .populate('category', "_id name")
    .populate('category', "_id name")
    .exec();
  res.json(products);
}

exports.searchFilters = async (req, res) => {
  const { query } = req.body;

  if (query) {
    console.log(query);
    await handleQuery(req, res, query)
  }
}