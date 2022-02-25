const router = require("express").Router();

const eventModel = require("../models/Event.model.js")





router.get ("/events",  (req, res, next) => {
    res.render("events.hbs")
})







module.exports = router;