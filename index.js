require('dotenv').config()
const express=require('express')
const app=express()
const signup=require('./Router/Signup') 
const login=require('./Router/Signin')
const conn=require('./DB/db_connection')


//db_connection
conn()


//middlewares
app.use(express.json())
app.use('/signup',signup)
app.use('/signin',login)
 

app.get('/home',(req,res)=>{
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

app.listen(process.env.PORT||4000,(err)=>{
     if(!err){
        console.log("Running successfully")
     }
     else{
        console.log(`Error: ${err}`)
     }    
})