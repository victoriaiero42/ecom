const admin = require("../firebase");
const User = require("../models/user");

exports.authCheck = async (req, res, next) => {
  // console.log(req.headers.authtoken);
  try {
    const firebaseUser = await admin
      .auth()
      .verifyIdToken(req.headers.authtoken);
    req.user = await firebaseUser;
    next();
  } catch (err) {
    console.log(err);
    res.json({
      err
    });
  }
};

exports.adminCheck = async (req, res, next) => {
  const { email } = req.user;

  const adminUser = await User.findOne({ email }).exec();

  if (adminUser.role !== "admin") {
    res.status.json({
      err: "Admin resourse. Access denied.",
    });
  } else {
    next();
  }
};
