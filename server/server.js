const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();
const fs = require("fs");

const app = express();

app.use(cors());

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("db connected"))
  .catch((err) => console.log("db connection error", err));

app.use(morgan("dev"));
app.use(express.json({ limit: '100mb', extended: true }));
app.use(express.urlencoded({ limit: '100mb', extended: true }));
// app.use(bodyParser.json({ limit: "100mb" }));

fs.readdirSync("./routes").map((r) =>
  app.use("/api", require("./routes/" + r))
);

app.listen(process.env.PORT, () => {
  console.log("running at", process.env.PORT);
});
