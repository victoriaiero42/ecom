const Product = require("../models/product");
const slugify = require("slugify");
const { default: UserNav } = require("../../client/src/components/nav/UserNav");

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

  let existingRaitingObject = product.raitings.find(
    (e) => e.postedBy.toString() === user._id.toString()
  );

  // if user haven't left raiting yet, push it
  if (existingRaitingObject === undefined) {
    let raitingAdded = await Product.findByIdAndUpdate(
      product._id,
      {
        $push: { raitings: { star: star, postedBy: user._id } },
      },
      { new: true }
    ).exec();
    console.log(raitingAdded);
    res.json(raitingAdded);
  } else {
    //if user have already left raiting, update it
    const raitingUpdated = await Product.updateOne(
      { raitings: { $elemMatch: existingRaitingObject } },
      { $set: { "raitings.$.star": star } },
      { new: true }
    ).exec();
    console.log(raitingUpdated);
    res.json(raitingUpdated);
  }
};
