const express = require("express");

const router = express.Router();

const { authCheck, adminCheck } = require("../middlewares/auth");

const { create, listAll, remove, read, update, list, productsCount, productStar, relatedProducts, searchFilters } = require("../controllers/product");

router.post("/product", authCheck, adminCheck, create);
router.get("/products/total", productsCount);

router.get("/products/:count", listAll);
router.get("/product/:slug", read);
router.put("/product/:slug", authCheck, adminCheck, update);
router.delete("/products/:slug", authCheck, adminCheck, remove);

router.post("/products", list);

router.put('/product/star/:productId', authCheck, productStar);

router.get('/product/related/:productId', relatedProducts);

router.post('/search/filters', searchFilters)

module.exports = router;
