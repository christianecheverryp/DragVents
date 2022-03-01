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
        console.log("pasamos por aqui", oneEvent)
        //let isOwner;
        //if (req.session.user) {
        //    isOwner = (req.session.user._id == oneEvent.creadoPor._id)
        //}
        const isOwner = (req.session.user?._id == oneEvent.creadoPor._id)
        // OPTIONAL CHAINING OPERATOR. super avanzado.
        

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
       // console.log("paso por aqui", oneEvent._id)

        res.redirect(`/${oneEvent._id}/details`)
    })
    .catch((err) => {
        next(err)
    })

})


router.get ("/profiles",  (req, res, next) => {

 

    UserModel.find()
    .then((allUsers) => {
        //console.log(allUsers, "BUENAS BUENAAAAS")
        //console.log(allUsers.name)

        //  let isUser;
        // if(req.session.user) {
        //     isUser = req.session.user._id ===
        // }
        // allUsers.forEach((user) => {

        // isUser = (req.session.user?._id == user._id)
        //console.log("BUENAAAS", allUsers)
        // let mostrarDrag;
        // allUsers.forEach ((drag) => {
        //    if(drag.role == "user"){
        //        mostrarDrag = drag
        //        console.log("muestro los users", mostrarDrag)
        //    }
        //     console.log("aqui muestro")
        // })
    


    

        res.render("profiles.hbs", {allUsers})
    })
    .catch((err) => {
        next(err)
    })

    
})

router.get("/:id/profile-details", (req, res, next) => {
    const { id } = req.params
    

    UserModel.findById(id)
    //.populate("creadoPor")
    .then((oneUser) => {
        //console.log("pasamos por aqui", oneEvent)
        
        //if (req.session.user) {
        //    isOwner = (req.session.user._id == oneEvent.creadoPor._id)
        //}
        const isUser = (req.session.user?._id == oneUser._id)
        // OPTIONAL CHAINING OPERATOR. super avanzado.
        

        res.render("profile-details.hbs", {oneUser, isUser})
    })
    .catch((err) => {
        next(err)
    })

})





module.exports = router;