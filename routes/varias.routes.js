const router = require("express").Router();

const EventModel = require("../models/Event.model.js")
const UserModel = require("../models/User.model")


router.get ("/events",  (req, res, next) => {

    EventModel.find()
    .then((allEvents) => {
        res.render("events.hbs", {allEvents})
    })
    .catch((err) => {
        next(err)
    })

    
})

router.get("/:id/details", (req, res, next) => {
    const { id } = req.params

    EventModel.findById(id)
    .populate("creadoPor")
    .then((oneEvent) => {
        res.render("event-details.hbs", {oneEvent})
    })
    .catch((err) => {
        next(err)
    })

})






module.exports = router;