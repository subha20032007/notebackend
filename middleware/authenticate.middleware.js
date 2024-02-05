const jwt=require("jsonwebtoken")
require("dotenv").config()
const authenticate=(req,res,next)=>{
    const token=req.headers.authorization
   try{
    if(token){
        const decode=jwt.verify(token,process.env.key)
       
    if(decode){
        console.log(decode)
        req.body.UserId=decode.UserId
      next()
    }else{
        res.send("Please Login ")
    }
}else{
        res.send("Please Login ")
    }
}catch(err){
    res.send("Please Login")
console.log(err)
}
}
module.exports={
    authenticate
}