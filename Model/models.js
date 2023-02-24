const {model,Schema}=require("mongoose")

//signin ORM model schema
const singin=new Schema({
"email":{
    type:String,
    required:true,
    unique:true
},
"password":{
    type:String,
    required:true,

}

})

//Signup ORM model schema
const signup=new Schema({
    "name":{
        type:String,
        required:true
    },
    "phone":{
        type:String,
        
    },
    "email":{
        type:String,
        required:true,
        unique:true
    },
    "password":{
        type:String,
        required:true,
    }

})


const otp=new Schema({
    "otp":{
        date:Date.now(),
        expirationDate:Date.now(),
    }
})


//creating model object
const Singup=model('Signup',signup)
const Signin=model('Signin',Signin)


// exporting the model object
module.exports={
    Signup,Signin
}