const express=require('express')
const router=express.Router();
const validator=require('email-validator')
const Signup=require('../Model/models')
const jwt=require('jsonwebtoken')
const bcrypt=require('bcrypt')
const verification=require('../DB/db_connection')

router.post('/',async(req,res)=>{

    const payload = { username: req.body.Name, phone:req.body.phone };
    const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '1h' });

    const email=req.body.Email;
    const password=req.body.Password;
    if(validator.validate(email)){
        const Signin=await Signup.find({email:req.body.Email})
        
        if(bcrypt.compareSync(password,Signin[0].password)){
            req.body.Password="";
            return res.status(200).json({
                "Message":"Password matched",
                "status":"ok",
                "Token":token,
                "Data":req.body
            })
        }
        else{
            return res.status(400).json({
                "Message":"Password didnot Matched",
                "status":"ok",
                "Data":req.body
            })
        }
    }
    else{
        return res.status(400).json({
            "Message":"Invalid email adderss",
            "status":"Failed",
            "Data":req.body
        })
    }
    
})



module.exports=router