const express = require("express");

const router = express.Router();

//middlewares
const { authCheck, adminCheck } = require("../middlewares/auth");

// controllers
const { create, read, update, remove, list } = require("../controllers/sub");

// routes

router.post("/sub", authCheck, adminCheck, create);
router.get("/subs", list);
router.get("/sub/:slug", read);
router.delete("/sub/:slug", authCheck, adminCheck, remove);
router.put("/sub/:slug", authCheck, adminCheck, update);

module.exports = router;
