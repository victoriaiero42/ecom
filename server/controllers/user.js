const User = require("../models/user");
const Product = require("../models/product");
const Cart = require("../models/cart");

exports.userCart = async (req, res) => {
  const { cart } = req.body;

  let products = [];

  const user = await User.findOne({ email: req.user.email }).exec();
  // console.log(user);
  let usersCart = await Cart.findOne({ orderedBy: user._id }).exec();
  // console.log(usersCart);
  if (usersCart) {
    usersCart.remove();
    console.log("removed old cart");
  }

  for (let i = 0; i < cart.length; i++) {
    let object = {};

    object.product = cart[i]._id;
    object.count = cart[i].count;
    object.color = cart[i].color;

    let { price } = await Product
      .findById(cart[i]._id)
      .select("price")
      .exec();

    object.price = price;

    products.push(object);
  }

  console.log('products', products);

  let cartTotal = 0;

  for (let i = 0; i < products.length; i++) {
    cartTotal = cartTotal + products[i].price + products[i].count;

  }

  // console.log('cartTotal', cartTotal);

  let newCart = await new Cart({
    products,
    cartTotal,
    orderedBy: user._id,

  }).save();

  console.log('new cart>>>>>>>>', newCart);
  res.json({ ok: true });

};

exports.getUserCart = async (req, res) => {
  const user = await User.findOne({ email: req.user.email }).exec();

  let cart = await Cart.findOne({ orderedBy: user._id })
    .populate('products.product', '_id title price totalAfterDiscount')
    .exec();

  const { products, cartTotal, totalAfterDiscount } = cart;

  res.json({ products, cartTotal, totalAfterDiscount })
}

exports.emptyCart = async (req, res) => {
  const user = await User.findOne({ email: req.user.email }).exec();

  const cart = await Cart.findOneAndRemove({ orderedBy: user._id }).exec();

  res.json(cart);
}