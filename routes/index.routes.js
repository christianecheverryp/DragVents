const router = require("express").Router();

const authRoutes = require ("./auth.routes");

const variasRoutes = require ("./varias.routes");


/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

router.use("/auth", authRoutes)


router.use("/", variasRoutes)


module.exports = router;
