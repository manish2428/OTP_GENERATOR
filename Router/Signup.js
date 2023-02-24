const express=require('express')
const router=express.Router()
const {Signup}=require('../Model/models')
const  validator = require("email-validator")
const jwt=require('jsonwebtoken')
const bcrypt=require('bcrypt')

router.post('/',async(req,res)=>{ 
    if(req.body.Password.length <5){
        return res.status(504).json({
            "Message":"Length of password should be greater than 5",
            "status":"notOK",
            "Data":req.body
        })
    }
    if(validator.validate(req.body.Email)){
        const payload = {
            phone: req.body.Phone,
            name: req.body.Name
          };
        const secu_key=process.env.SECRET_KEY  
        const token=jwt.sign(payload,secu_key, "Stack", {

            expiresIn: '1d' // expires in 1 day
 
       })
        const signup=await Signup({
            name:req.body.Name,
            phone:req.body.Phone,
            email:req.body.Password
        })
        
        // console.log(process.env.SALT_ROUND)
        const gen_salt=bcrypt.genSalt(10)
        .then(async(result)=>{
            let x=await bcrypt.hash(req.body.Password,result)
            console.log(signup.password)
        })
        .catch((err)=>{
            console.log(`Error: ${err}`)
        })

        // console.log(gen_salt)


        // const hash=bcrypt.hash(req.body.Password,res)
        // .then((hash)=>{
        //     console.log(hash)
        // })
        // .catch((err)=>{
        //     console.log(`Error: ${err}`)
        // })


        // password=bcrypt.hash(req.body.Password,res)
        // .then((result)=>{
        //     console.log(result)
        // })
        // .catch((err)=>{
        //     console.log(`Error: ${err}`)
        // })

        
        // console.log(gen_salt)
        // console.log(req.body.Password)
        // console.log(await bcrypt.hash(req.body.Password,gen_salt))
        signup.save()

        return res.status(200).json({
            "Message":"Email isverified",
            "status":"OK",
            "Data":req.body,
            "token":token
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