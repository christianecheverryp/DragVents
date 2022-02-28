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
        const isOwner = (req.session.user._id == oneEvent.creadoPor._id)

        res.render("event-details.hbs", {oneEvent, isOwner})
    })
    .catch((err) => {
        next(err)
    })

})

router.get ("/search", (req, res, next) => {


    req.query.location = req.query.location.toUpperCase()

   EventModel.findOne( { location: req.query.location} )

    .then ((oneEvent) => {

        res.redirect(`/${oneEvent._id}/details`)
    })
    .catch((err) => {
        next(err)
    })

})






module.exports = router;