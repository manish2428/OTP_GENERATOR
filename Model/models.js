const {model,Schema}=require("mongoose")

module.exports.singin=new Schema({
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


module.exports.signup=new Schema({
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


module.exports.otp=new Schema({
    "otp":{
        date:Date.now(),
        expirationDate:Date.now()+
    }
})