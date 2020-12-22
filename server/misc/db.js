const mongoose = require('mongoose');
require('dotenv').config()


module.exports = mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: true,
})
  .then(() => console.log('db connected'))
  .catch(err => console.log(`db connection error ${err}`))
