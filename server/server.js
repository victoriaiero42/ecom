const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config()

// import bodyParser from 'body-parser';
// import './misc/db.js';
// const db = require('./misc/db');
// db();
// import fs from 'fs';
const fs = require('fs');

const app = express();

mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: true,
})
  .then(() => console.log('db connected'))
  .catch(err => console.log('db connection error', err))


app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

fs.readdirSync('./routes').map((r) => app.use('/api', require('./routes/' + r)))

app.listen(process.env.PORT, () => {
  console.log('running at', process.env.PORT);
});