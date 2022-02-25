const router = require("express").Router();
const UserModel = require("../models/User.model")

/* SIGN UP */
router.get("/signup",  (req, res, next) => {
    res.render("auth/signup.hbs")
})

router.post("/signup", async (req, res, next) => {
const { name, email, password, role } = req.body // todo. Tenemos la duda del role, en algun momento se utilizara, pero no sabemos cuando
console.log(req.body)
// Revisar que todos los campos esten llenos
if (!name || !email || !password || !role) {
    res.render('auth/signup', { errorMessage: 'Debes introducir todos los campos' });
    return;
  }
// Revisar los requisitos de la contraseña
const passwordRegex = /^(?=.*[A-z])(?=.*[0-9])/
if(!passwordRegex.test(password)){
    res.render("auth/signup.hbs", {
        errorMessage: "La contraseña no cumple con los requisitos"
    })
    return;
}
// Revisar que el email tenga su formato correcto
const emailRegex = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/
if(!emailRegex.test(email)){
    res.render("auth/signup.hbs", {
        errorMessage: "Cuenta de mail invalida"
    })
}

// Revisar que no existe un usuario con el mismo email
/* try {
    const findEmail = await UserModel.findOne({email})
    if(findEmail){
        res.render("auth/signup.hbs", {
            errorMessage: "Ya existe un usuario con este email"
        })
    }
}
catch(err){
    next(err)
} */
})

router.get("/login", (req, res, next) => {
    res.render("auth/login.hbs")
})



module.exports = router;