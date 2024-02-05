const mongoose=require("mongoose")

const UserSchema=mongoose.Schema({
    name:String,
    email:String,
    age:Number,
    pass:String
})

const UserModel=new mongoose.model("user",UserSchema)

module.exports={
    UserModel
}