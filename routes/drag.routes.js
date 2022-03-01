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
        //console.log("por aqui paso", req.session.user._id)

        res.render("drag/create-profile.hbs", {oneDrag})

    }
    catch (err) {
        next(err)
    }

})

router.post("/create-profile", fileUploader.single("imgProfile"),  (req, res, next) => {

    let {name, description} = req.body
    console.log("aqui etoy", req.file)

    UserModel.findByIdAndUpdate(req.session.user._id, {name, description, imgProfile: req.file.path})
    .then((updateDrag) => {
        //console.log(updateDrag)
        res.redirect("/profiles")
    })
    .catch ((err)=> {
        next(err)
    })
})


router.post("/:id/profile-delete", async (req, res, next) => {
    try{
        const {id} = req.params

        await UserModel.findByIdAndDelete(id)
        res.redirect("/profiles")

    }
    catch(err){
        next(err)
    }
})  






module.exports = router;