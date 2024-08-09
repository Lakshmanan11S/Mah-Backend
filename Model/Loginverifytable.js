const mongoose=require('mongoose');

const loginSchema=new mongoose.Schema({
    Email:{
        type:String,
    },
    Password:{
        type:String,
    },
    Otp:{
        type:String,
    },
    
})
const result=new mongoose.model("LoginTable",loginSchema)

module.exports=result