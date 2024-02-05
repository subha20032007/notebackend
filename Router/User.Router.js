const express=require("express")
const UserRouter=express.Router()
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const { UserModel } = require("../model/User.model")
require("dotenv").config()

UserRouter.get("/",async(req,res)=>{
    const token=req.headers.authorization
   
    try{
        const decode=jwt.verify(token,process.env.key)
        if(decode){
            const user=await UserModel.find()
        res.send(user)
        }else{
            res.send("Login First")
        }
        
    }catch(err){
        console.log(err)
        res.send("Wrong Credential")
    }
})
UserRouter.post("/register",async(req,res)=>{
    const {name,age,email,pass}=req.body
    try{
        bcrypt.hash(pass,9,async(err,hash)=>{
            const user=new UserModel({
                name,age,email,pass:hash
            })
            await user.save()
        })
        res.send("user is registered")
    }catch(err){
        console.log(err)
        res.send("err while register")
    }
})
UserRouter.post("/login",async(req,res)=>{
    const {email,pass}=req.body
    
    try{
        const user=await UserModel.find({email:email})
        console.log(user[0]._id)
        if(user.length>0){
        bcrypt.compare(pass,user[0].pass,(err,result)=>{
           if(result){
             const token= jwt.sign({UserId:user[0]._id},process.env.key)
             res.send(token)
           }else{
       res.send("wrong credential")
           }
        })
    }else{
        res.send("wrong credential")
    }
    }catch(err){
        console.log(err)
        res.send("err userpage")
    }
})
module.exports={
    UserRouter
}