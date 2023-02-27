require('dotenv').config()
const express=require('express')
const app=express()
const signup=require('./Router/Signup') 
const login=require('./Router/Signin')
const conn=require('./DB/db_connection')
const verification=require('./Authorization/jwt_auth')
const Signup=require('./Model/models')


//db_connection
conn()


//middlewares
app.use(express.json())
app.use('/signup',signup)
app.use('/signin',login)
 

app.get('/home',verification,(req,res)=>{
    const date=new Date()
    let min=date.getMinutes()
    console.log(min)
    if(min > 60){
         min=5
    }else if(min+5 >= 59){
        min=min-55
    }else{
        min+=5
    }
    console.log(min)
    return res.status(200).json({
        "Message":"Request is here",
        "Status":"OK",
        "Data":"This is homepage."
    })
})

app.post('/verify',(req,res)=>{
const otp=req.body.otp;
const email=req.body.email;
console.log(otp);
let signup=Signup({email})

if(signup.otp===otp){
    let data=Signup.updateOne({email},{$set:{"verified":true}})
    data.save()
    .then(()=>{
        console.log("Data updated successfully.")
    })
    .catch((err)=>{
        console.log('Error occured while Savind the data: ',err)
    })


    return res.status(200).json({
        "message":"Account verified successfully",
        "Status":200,
        "account":"verified"
    })
}
else{
    return res.status(500).json({
        "message":"OTP didnot matched",
        "Status":500,
        "account":"unverified"
    })
}
})

app.listen(process.env.PORT||4000,(err)=>{
     if(!err){
        console.log("Running successfully")
     }
     else{
        console.log(`Error: ${err}`)
     }    
})