const router = require("express").Router();
const UserModel = require("../models/User.model");
const bcrypt = require("bcryptjs")

/* SIGN UP */


router.get("/signup",  (req, res, next) => {
    res.render("auth/signup.hbs")
})

router.post("/signup", async (req, res, next) => {
const { name, email, password, role, description, imgProfile } = req.body // todo. Tenemos la duda del role, en algun momento se utilizara, pero no sabemos cuando
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
 try {
    const findEmail = await UserModel.findOne({email})
    if(findEmail){
        res.render("auth/signup.hbs", {
            errorMessage: "Ya existe un usuario con este email"
        })
        return;
    }

//Encriptado de contraseña
const salt = await bcrypt.genSalt(10);
const hashPassword = await bcrypt.hash(password, salt);

//Creando usuario
const newUser = await UserModel.create({
    name, 
    email,
    password: hashPassword,
    role,
    description,
    imgProfile
})
console.log("pasoooo", newUser)

req.session.user = newUser;

//VARIABLES LOCALES
req.app.locals.isLoggedIn = true 

if (newUser.role === "admin") {
    req.app.locals.adminLocal = true 
} 

res.redirect("/events")

}
catch(err){
    next(err)
}
})


/* LOG IN */

router.get("/login", (req,res,next) => {
    res.render("auth/login.hbs")
})

router.post("/login", async (req, res, next) => {

    const { email, password } = req.body

    //el usuario debe enviar ambas credenciales

    if (!email || !password) {
        res.render("auth/login.hbs", {
            errorMessage: "Debes llenar todo los campos."
        })
        return; 
    }

    try {
        //Confirmar que el email existe 
        const foundUser = await UserModel.findOne({ email });
        if (!foundUser) {
            res.render("auth/login.hbs", {
                errorMessage: "Ese usuario no existe."
            })
            return; 
        }

        //Validar contraseña 
        const passwordMatch = await bcrypt.compare(password, foundUser.password)
        if (!passwordMatch) {
            res.render("auth/login.hbs", {
                errorMessage: "Contraseña incorrecta"
            })
        }

        //USUARIO CHECKED 

        req.session.user = foundUser;
        //console.log(req.session.user)
        
       //VARIABLE LOCAL
        req.app.locals.isLoggedIn = true

        if (req.session.user.role === "admin") {
            req.app.locals.adminLocal = true 
            //console.log("ok")
        }



    res.redirect("/events");


    }
    catch (err) {
        next(err)
    }








})



router.get ("/logout", (req, res, next) => {
    req.session.destroy();
    res.redirect("/")
    req.app.locals.isLoggedIn = false
    req.app.locals.adminLocal = false 
})





module.exports = router;