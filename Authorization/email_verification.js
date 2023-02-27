const otpGenerator = require('otp-generator')
const nodemailer=require('nodemailer');

const otp_verification=async()=>{
const otp=await otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false });


var transporter=nodemailer.createTransport({
    service:'email',
    auth:{
        user:'manishyadav2056107@gmail.com',
        pass:''
    }
})

var  mailoptions={
    from:"manishyadav2056107@gmail.com",
    to:"1805688@kiit.ac.in",
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
}

module.exports=otp_verification



