const router = require("express").Router();
const async = require("hbs/lib/async");
const EventModel = require("../models/Event.model");
const UserModel = require("../models/User.model")

const isAdmin = require ("../middlewares/isAdmin")

router.get("/create", isAdmin, (req, res, next) => {
    res.render("admin/create-event.hbs")

})

router.post("/create", (req, res, next) => {
    let { title, location, date, time, description, img, creadoPor } = req.body
    location = location.toUpperCase()

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

router.post("/:id/delete", isAdmin, async (req, res, next) => {
    try{
        const {id} = req.params

        await EventModel.findByIdAndDelete(id)
        res.redirect("/events")

    }
    catch(err){
        next(err)
    }
})  

router.get ("/:id/edit", isAdmin, async (req,res,next) => {
    try {

        const {id} = req.params

        const oneEvent = await EventModel.findById(id)

        res.render("admin/edit-event.hbs", {oneEvent})
    }
    catch (err) {
        next(err)
    }
})

router.post ("/:id/edit", (req, res, next) => {
    const {id} =req.params
    const {title, description, location, date, time, img} = req.body

    EventModel.findByIdAndUpdate(id, {title, description, location, date, time, img })
    .then ((updatedEvent) => {

        res.redirect(`/${updatedEvent._id}/details`)

    })
})


module.exports = router;