const {Schema, model} = require ("mongoose")

const eventSchema = new Schema ({

    title: {
        type: String,
        required: true
    },
    creadoPor: {
        type: Schema.Types.ObjectId,
        ref: "UserModel"
    },
    location: {
        type: String, 
        required: true 
    },
    date: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    img: {
        type: String
        //averiguar si podemos poner una imagen por default
    }

});

const EventModel = model ("EventModel", eventSchema);

module.exports = EventModel;