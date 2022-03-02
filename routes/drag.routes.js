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
        //console.log("por aqui paso", req.session.user._id)

        res.render("drag/create-profile.hbs", {oneDrag})

    }
    catch (err) {
        next(err)
    }

})

router.post("/create-profile", fileUploader.single("imgProfile"),  (req, res, next) => {

    let {name, description} = req.body
    //console.log("aqui etoy", req.file)

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

router.post("/:id/unirme",async (req, res, next) =>{
    
    try  {

    const {id} = req.params

    //console.log("aqui esta el jon", id)
    const elDrag = await EventModel.findById(id)
    //console.log("aquiiiiiiiiii", elDrag)
    //const elDrag =  await EventModel.findByIdAndUpdate(id, {joinUsers: req.session.user})
    await elDrag.updateOne({$addToSet: {joinUsers: req.session.user._id}})


    //await elDrag.updateOne({ $cond: { if: {$not: id}, then: {$push: {joinUsers: req.session.user._id}} } })
    //await elDrag.updateOne({ $cond: { if: {$elemMatch: elDrag.joinUsers}, then: {$push: {joinUsers: req.session.user._id}}   } })
    console.log("aquie esta el DRag", elDrag.joinUsers)

//{$cond: {if:{ joinUsers  !includes req.session.user._id}, then:{ await elDrag.updateOne({joinUsers: req.session.user._id}) } }}}
    






    //if(req.session.user._id !==)
    //console.log("que es", {joinUsers: req.session.user._id})

        //update( <query>,{ $push: { <field>: <value> } })

        
        //console.log("aqui hay algo", elDrag)
        //cuando cliko push (joinUsers)

        //let dragArr = elDrag.joinUsers.push(req.session.user.name)
        res.redirect("/events")
        //console.log("aque el Drag", elDrag) 
        //console.log("aquie esta el array", elDrag.joinUsers)
        //console.log("intento", dragArr)



    }
    catch(err) {
        next(err)
    }

})





module.exports = router;