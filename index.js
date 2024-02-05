const express=require("express")
const { connection } = require("./config/db")
const { UserRouter } = require("./Router/User.Router")
const { NoteRouter } = require("./Router/Note.Router")
const { authenticate } = require("./middleware/authenticate.middleware")
const app=express()
const cors=require("cors")
app.use(cors({origin:"*"}))
app.use(express.json())
app.get("/",(req,res)=>{
    res.send("Home page")
})
app.use("/user",UserRouter)
app.use(authenticate)
app.use("/note",NoteRouter)
app.listen(process.env.port,async()=>{
    try{
        await connection
        console.log("connected to db")
     }catch(err){
         console.log(err)
   
     }
    console.log("app is connected ",process.env.port)
})