var express=require('express')
var router=express.Router()

router.post('/',(req,res)=>{
    console.log("signin route called")
    return res.status(200).json({
        "Message":"This is login",
        "status":"ok",
        "Data":req.body
    })
})



module.exports=router