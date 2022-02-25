//CON ESTO VERIFICAMOS SI EL USUARIO ES ADMIN O USER NOMAL

// const isAdmin = (req, res, next) => {
//     if(req.session.user === "admin"){
//         next() // entonces le permitimos acceso(continua con la ruta)
//     }else {
//         res.redirect("/profile")
//     }
// }

// module.exports = isAdmin