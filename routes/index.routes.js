const router = require("express").Router();

const authRoutes = require ("./auth.routes");

const variasRoutes = require ("./varias.routes");

const adminRoutes = require("./admin.routes");




/* GET home page */
router.get("/", (req, res, next) => {
 
  res.render("index");
})

router.use("/auth", authRoutes)


router.use("/", variasRoutes)

router.use("/", adminRoutes)


module.exports = router;
