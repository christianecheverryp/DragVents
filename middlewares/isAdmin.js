//CON ESTO VERIFICAMOS SI EL USUARIO ES ADMIN 

const isAdmin = (req, res, next) => {
    if(req.session.user.role === "admin"){
        next() // entonces le permitimos acceso(continua con la ruta)
    }else {
        res.redirect("/events")
    }
}

module.exports = isAdmin