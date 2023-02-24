const mongoose=require('mongoose')


function conn(){
mongoose.connect('mongodb://localhost/OTP_generator', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to database'))
  .catch((error) => console.log('Error connecting to database:', error));
}

module.exports=conn