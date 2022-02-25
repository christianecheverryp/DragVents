//SI EL USUARIO ES EVENTERO

const isEventero = (req, res, next) => {
    if(req.session.user.role === "user"){
        next() // entonces le permitimos acceso(continua con la ruta)
    }else {
        res.redirect("/events")
    }
}

module.exports = isEventero