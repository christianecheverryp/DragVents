const router = require("express").Router();

const EventModel = require("../models/Event.model");
const UserModel = require("../models/User.model")
const fileUploader = require("../middlewares/uploader")


router.get("/profiles", (req, res, next) => {
    res.render("drag/profiles.hbs")
})

router.get("/create-profile", async (req, res, next) => {

    try {

        const {id} = req.params

        const oneDrag = await UserModel.findById(req.session.user._id)
        console.log("por aqui paso", req.session.user._id)

        res.render("drag/create-profile.hbs", {oneDrag})

    }
    catch (err) {
        next(err)
    }

})

router.post("/create-profile",  (req, res, next) => {

    let {name, description, imgProfile} = req.body
    console.log("aqui etoy", req.body)

    UserModel.findByIdAndUpdate(req.session.user._id, {name, description, imgProfile})
    .then((updateDrag) => {
        
        res.redirect("/profiles")
    })
})






module.exports = router;