const {model,Schema}=require("mongoose")

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
    },
    "verified":{
        type:String,
        required:true,
        
    },
    "otp":{
        type:String
           
    }

})


// otp schema
 
// let otpsch = Schema(
//     {
//       number: {
//         type: String,
//         required: true
//       },
//       otp: {
//         type: String,
//         required: true
//       },
//       createdAt: {
//         type: Date,
//         default: Date.now,
//         index: { expires: 300 }
//       }
//     },
//     { timestamps: true } // Auto remove after 5 minutes
//   );


//creating model object
const Singup=model('Signup',signup)
// const OtpSch=model('OtpSch',otpsch)


// exporting the model object
module.exports=Singup