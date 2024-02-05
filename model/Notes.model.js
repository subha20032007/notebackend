const mongoose=require("mongoose")

const noteSchema=mongoose.Schema({
    title:String,
    note:String,
    category:String,
    UserId:String
})
const NoteModel=new mongoose.model("note",noteSchema)

module.exports={
    NoteModel
}