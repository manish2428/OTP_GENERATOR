const express=require('express')
const router=express.Router()
const Signup=require('../Model/models')
const  validator = require("email-validator")
const jwt=require('jsonwebtoken')
const bcrypt=require('bcrypt')
const otpgenerator=require('otp-generator')
const {otp_verification}=require('../Authorization/email_verification')
const nodemailer=require('nodemailer')

router.post('/',async(req,res)=>{ 
    // console.log("hello world")
    if(req.body.Password.length <5){
        return res.status(504).json({
            "Message":"Length of password should be greater than 5",
            "status":"notOK",
            "Data":req.body
        })
    }

    if(validator.validate(req.body.Email)){
        let email=req.body.Email;
        let data=await Signup({email})
        if(data.length>0){
            return res.status(500).json({
                "Message":"Email alerady exist",
                "status":"available"
            })
        }
        const saltRounds = 10;
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(req.body.Password, salt);
        console.log(hash)
   
        const signup=await Signup({
            name:req.body.Name,
            phone:req.body.Phone,
            email:req.body.Email,
            password:hash,
            verified:false
        })
        
        
        const otp=await otpgenerator.generate(6, { upperCaseAlphabets: false, specialChars: false });
        var transporter=nodemailer.createTransport({
            service:'smtp.gmail.com',
            auth:{
                user:'manishyadav2056107@gmail.com',
                pass:'MANISH12345'
            }
        })
        console.log(otp)
        var  mailoptions={
            from:"manishyadav2056107@gmail.com",
            to:req.body.Email,
            subject:"Verification Email",
            text:`Your otp is ${otp}.
                  OTP will expire in 5 minutes.`
        }
        transporter.sendMail(mailoptions,function(err,info){
            if(err){
                console.log(err);
            }else{
                console.log(`Email sent:${info.response}`);
            }
        })
        signup.opt=otp;

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
            "Data":req.body,
            
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