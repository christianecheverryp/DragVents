const router = require("express").Router();
const EventModel = require("../models/Event.model");
const UserModel = require("../models/User.model")

router.get("/create", (req, res, next) => {

    UserModel.find()
    .then((admin) => {
        res.render("admin/create-event.hbs", {admin})
    })
    .catch((err) => {
        next(err)
    })
    
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
        creadoPor
    })
    .then((eachEvent) => {
        res.redirect("/events")
        console.log(eachEvent)
    })
    .catch((err) => {
        next(err)
    })
})




module.exports = router;