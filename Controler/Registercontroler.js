const bcrypt=require('bcrypt');
const registerModel=require('../Model/Registermodel')

exports.register=async(req,res)=>{
    try{
        const{userName,Email,PhoneNo,Password}=req.body

        
        const exitingEmail=await registerModel.findOne({Email})

        if(exitingEmail){
            return res.status(404).json({message:"This Email is Already Used"})
        }
        const saltRounds=10;
        const hashPassword=await bcrypt.hash(Password,saltRounds)
        
        const newRegister=new registerModel({
            userName,
            Email,
            PhoneNo,
            Password:hashPassword
        })
        await newRegister.save()
        res.status(201).json({message:"New Register Details Saved Successfully",data:newRegister})
    }catch(error){
        res.status(500).json({message:"Internal server error found"})
    }
}

exports.getAllRegister=async(req,res)=>{
    try{
        const registerDetails = await registerModel.find().select('userName')
        if(!registerDetails||registerDetails.length===0){
            return res.status(404).json({message:"Register Data Not fount.."})
        }
        res.status(200).json({message:"Register Data Fetched Successfully",data:registerDetails})
    }catch(error){
        res.status(500).json({message:"Register Data Fetched Error Found..."})
    }
}