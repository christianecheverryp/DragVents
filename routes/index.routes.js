const router = require("express").Router();

const authRoutes = require ("./auth.routes");

const variasRoutes = require ("./varias.routes");

const adminRoutes = require("./admin.routes");

const dragRoutes = require("./drag.routes");


// middleware para entorno de desarrollo
router.use((req, res, next) => {
  if (req.session.user) {
    req.app.locals.isLoggedIn = true

    if (req.session.user.role === "admin") {
        req.app.locals.adminLocal = true 
      
    } else if (req.session.user.role === "user") {
        req.app.locals.userLocal = true
    }
  }
  next()
})


/* GET home page */
router.get("/", (req, res, next) => {
 
  res.render("index");
})

router.use("/auth", authRoutes)


router.use("/", variasRoutes)

router.use("/", adminRoutes)

router.use("/", dragRoutes)


module.exports = router;
