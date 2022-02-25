const { Schema, model } = require("mongoose");


const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true 
    },
    password: {
      type: String,
    required: true 
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user" //verificar más adelante con el checkbox
  },
       // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,

}
);

const UserModel = model("UserModel", userSchema);

module.exports = UserModel;
