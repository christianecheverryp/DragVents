const router = require("express").Router();

const EventModel = require("../models/Event.model");
const UserModel = require("../models/User.model")
const fileUploader = require("../middlewares/uploader");
const async = require("hbs/lib/async");


router.get("/profiles", (req, res, next) => {
    res.render("drag/profiles.hbs")
})

router.get("/create-profile", async (req, res, next) => {

    try {

        const {id} = req.params

        const oneDrag = await UserModel.findById(req.session.user._id)

        res.render("drag/create-profile.hbs", {oneDrag})

    }
    catch (err) {
        next(err)
    }

})

router.post("/create-profile", fileUploader.single("imgProfile"),  (req, res, next) => {

    let {name, description, redes} = req.body

    let imgProfile;

    if (req.file) {
        imgProfile = req.file.path
    } 

    UserModel.findByIdAndUpdate(req.session.user._id, {name, description, redes, imgProfile})
    .then((updateDrag) => {
        if (!name) {
                res.render("drag/create-profile.hbs", {
                    errorMessage: "Necesitamos aunque sea tu nombre para armar el perfil."
                })
                return; 
            }
    
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
        res.redirect("/auth/logout")

    }
    catch(err){
        next(err)
    }
})  

router.post("/:id/unirme",async (req, res, next) =>{
    
    try  {

    const {id} = req.params


    const elDrag = await EventModel.findById(id)
 
    await elDrag.updateOne({$addToSet: {joinUsers: req.session.user._id}})



    console.log("aquie esta el DRag", elDrag.joinUsers)

 
        res.redirect("/events")


    }
    catch(err) {
        next(err)
    }

})





module.exports = router;