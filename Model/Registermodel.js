const mongoose=require('mongoose');

const registerSchema=new mongoose.Schema({
    userName:{
        type:String,
    },
    Email:{
        type:String,
    },
    PhoneNo:{
        type:String,
    },
    Password:{
        type:String,
    },
})

const result=new mongoose.model("Register",registerSchema)

module.exports=result