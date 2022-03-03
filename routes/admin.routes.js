const router = require("express").Router();
const async = require("hbs/lib/async");
const EventModel = require("../models/Event.model");
const UserModel = require("../models/User.model")

const fileUploader = require("../middlewares/uploader")

const isAdmin = require ("../middlewares/isAdmin")

router.get("/create", isAdmin, (req, res, next) => {
    res.render("admin/create-event.hbs")

})

router.post("/create", fileUploader.single("img"), (req, res, next) => {
    let { title, location, date, time, description, creadoPor, redesEvent } = req.body
    location = location.toUpperCase()

    let img = "../images/events-img.jpg"

    if (!title || !description || !location || !date || !time) {
        res.render("admin/create-event.hbs", {
            errorMessage: " Ojito, los campos: Título, Locación, Date, Time, Description deben ser completados."
        })
        return; 
    }

if (req.file) {
    img = req.file.path
} 

//VALIDACIONES

    EventModel.create({
        title,
        location,
        date,
        time,
        description,
        redesEvent,
        img,
        creadoPor: req.session.user // aqui sabemos que usuario esta conectado
    })
    //console.log(req.file)
    .then((eachEvent) => {
        res.redirect("/events")
        
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

router.post ("/:id/edit", fileUploader.single("img"), (req, res, next) => {
    const {id} =req.params
    let {title, description, location, date, time} = req.body
let img = "../images/events-img.jpg"

if (title || description || location || date || time) {
    res.render("admin/edit-event.hbs", {
        errorMessage: " Ojito, los campos: Título, Locación, Date, Time, Description deben ser completados."
    })
    return; 
}

if (req.file) {
    img = req.file.path
} 

    EventModel.findByIdAndUpdate(id, {title, description, location, date, time, img })
    .then ((updatedEvent) => {

        res.redirect(`/${updatedEvent._id}/details`)

    })
})


module.exports = router;