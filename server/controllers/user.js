const User = require("../models/user");
const Product = require("../models/product");
const Cart = require("../models/cart");

exports.userCart = async (req, res) => {
  const { cart } = req.body;

  let products = [];

  const user = await (await User.findOne({ email: req.body.email })).exec();

  let usersCart = await (await Cart.findOne({ orderedBy: user._id })).exec();

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

  console.log('new cart', newCart);

  res.json({ ok: true });

};
