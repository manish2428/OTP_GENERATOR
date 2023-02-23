var express=require('express')
var router=express.Router()

router.post('/',(req,res)=>{
    // console.log("signup route ")
    return res.status(200).json({
        "Message":"This is login",
        "status":"ok",
        "Data":req.body
    })
})



module.exports=router