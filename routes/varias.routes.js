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
    .populate("joinUsers")
    .then((oneEvent) => {
        
        const isOwner = (req.session.user?._id == oneEvent.creadoPor._id)
        // OPTIONAL CHAINING OPERATOR. super avanzado.
        

        res.render("event-details.hbs", {oneEvent, isOwner})
    })
    .catch((err) => {
        next(err)
    })

})


router.get ("/search/events", (req,res,next) => {
    res.render ("search-event.hbs")
})

router.get ("/search", (req, res, next) => {


    req.query.location = req.query.location.toUpperCase()
    
   EventModel.find( { location: req.query.location} )

    .then ((findEvents) => {
        console.log(findEvents)
      

        res.render("search-event.hbs", {findEvents})
     
    })
    .catch((err) => {
        next(err)
    })



})


router.get ("/profiles",  (req, res, next) => {

    
 

    UserModel.find({role: "user"})
    .then((onlyDrags) => {
       

        res.render("profiles.hbs", {onlyDrags})
    })
    .catch((err) => {
        next(err)
    })

    
})

router.get("/:id/profile-details", (req, res, next) => {
    const { id } = req.params
    

    UserModel.findById(id)
   
    .then((oneUser) => {
   
        const isUser = (req.session.user?._id == oneUser._id)
        // OPTIONAL CHAINING OPERATOR. super avanzado.
        

        res.render("profile-details.hbs", {oneUser, isUser})
    })
    .catch((err) => {
        next(err)
    })

})





module.exports = router;