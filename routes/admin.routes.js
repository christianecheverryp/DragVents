const router = require("express").Router();
const async = require("hbs/lib/async");
const EventModel = require("../models/Event.model");
const UserModel = require("../models/User.model")

router.get("/create", (req, res, next) => {
    res.render("admin/create-event.hbs")
/*     UserModel.find()
    .then((admin) => {
        
    })
    .catch((err) => {
        next(err)
    })
     */
})

router.post("/create", (req, res, next) => {
    const { title, location, date, time, description, img, creadoPor } = req.body
    EventModel.create({
        title,
        location,
        date,
        time,
        description,
        img,
        creadoPor: req.session.user // aqui sabemos que usuario esta conectado
    })
    .then((eachEvent) => {
        res.redirect("/events")
        console.log(eachEvent)
    })
    .catch((err) => {
        next(err)
    })
})

router.post("/:id/delete",async (req, res, next) => {
    try{
        const {id} = req.params

        await EventModel.findByIdAndDelete(id)
        res.redirect("/events")

    }
    catch(err){
        next(err)
    }
})  


module.exports = router;