const express=require('express')
const router=express.Router()
const Signup=require('../Model/models')
const  validator = require("email-validator")
const jwt=require('jsonwebtoken')
const bcrypt=require('bcrypt')

router.post('/',async(req,res)=>{ 
    console.log("hello world")
    if(req.body.Password.length <5){
        return res.status(504).json({
            "Message":"Length of password should be greater than 5",
            "status":"notOK",
            "Data":req.body
        })
    }
    if(validator.validate(req.body.Email)){
      

        const saltRounds = 10;
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(req.body.Password, salt);
        console.log(hash)
   
        const signup=await Signup({
            name:req.body.Name,
            phone:req.body.Phone,
            email:req.body.Email,
            password:hash
        })

        signup.save()
        .then(()=>{
            console.log("Document saved successfully");
        })
        .catch((err)=>{
            console.log(`Error occured while saving the document:${err}`);
        })

        return res.status(200).json({
            "Message":"Email isverified",
            "status":"OK",
            "Data":req.body
        })


    }
    else {
        return res.status(400).json({
            "Message":"Email is not verified",
            "status":"notOK",
            "Data":req.body
        })
    }
})



module.exports=router