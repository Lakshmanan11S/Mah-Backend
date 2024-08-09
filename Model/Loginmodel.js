const mongoose=require('mongoose');

const loginSchema=new mongoose.Schema({
    Email:{
        type:String,
    },
    Password:{
        type:String,
    }
})
const result=new mongoose.model("Login",loginSchema)

module.exports=result