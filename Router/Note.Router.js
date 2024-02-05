const express=require("express")
const { NoteModel } = require("../model/Notes.model")
const { UserModel } = require("../model/User.model")

const NoteRouter=express.Router()

NoteRouter.get("/",async(req,res)=>{
    const params=req.params.id
    console.log(params)
    try{
   const notes=await NoteModel.find()
     res.send(notes)
    }catch(err){
        console.log(err)
        res.send("Notes")
    }
})
NoteRouter.get("/:id",async(req,res)=>{
    const ID=req.params.id

    try{
   const notes=await NoteModel.find({_id:ID})
   if(notes.length>0){
    res.send(notes[0])
   }else{
    res.send({invalid_user:"NoData"})
   }
   
    }catch(err){
        console.log(err)
        res.send({"Err":"Notes"})
    }
})
NoteRouter.post("/create",async(req,res)=>{
    const payload=req.body
    try{
        const notes=new NoteModel(payload)
        await notes.save()
     res.send("Notes has Been Saved ")
    }catch(err){
        console.log(err)
        res.send("Err")
    }
})
NoteRouter.patch("/update/:id",async(req,res)=>{
    const payload=req.body
    const id=req.params.id
    const notes=await NoteModel.find({_id:id})
    console.log(notes)
    const UserId_in_note=notes[0]?.UserId
    const UserId_makeing_req=req.body.UserId
  console.log(UserId_makeing_req,UserId_in_note)
    try{
        if(UserId_makeing_req!==UserId_in_note){
            res.send("You are not authorized")
        }else{
            await NoteModel.findByIdAndUpdate({_id:id},payload)
            res.send("Note Has been Updated")
        }
     

    }catch(err){
        console.log(err)
        res.send({"Err":"Notes"})
    }
})
NoteRouter.delete("/delete/:id",async(req,res)=>{
    const id=req.params.id
    const user=await NoteModel.find({_id:id})
    
    const UserId_form_note=user[0]?.UserId
    const UserId_makeing_req=req.body.UserId
    console.log(user)
    try{
        if(UserId_form_note!==UserId_makeing_req){
            res.send("User Not Authorized")
        }else{ 
      await NoteModel.findByIdAndDelete({"_id":id})
     res.send("Notes Has been deleted")
        }
    }catch(err){
        console.log(err)
        res.send({"Err":"Notes"})
    }
})

module.exports={
    NoteRouter
}

//65bd287a81e8dd5b311cd889