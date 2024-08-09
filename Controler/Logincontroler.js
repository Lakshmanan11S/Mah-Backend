const cookieParser = require('cookie-parser');
const loginModel=require('../Model/Loginmodel')
const registerModel=require('../Model/Registermodel')
const loginTablemodel=require('../Model/Loginverifytable')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken');
const nodemailer=require('nodemailer');
require('dotenv').config()

exports.login=async(req,res)=>{
    try{
        const{Email,Password}=req.body

        const user=await registerModel.findOne({Email})

        if(!user){
            return res.status(404).json({message:"Username Not Found"})
        }
        const passwordMatch=await bcrypt.compare(Password,user.Password)
        if(!passwordMatch){
            return res.status(401).json({message:"Password Error Found"})
        }

        const token=jwt.sign({Email:user.Email},process.env.JWTKEY)
        const userLogin=new loginModel({
            Email,
            Password:user.Password
        })
        
        await userLogin.save()
        res.cookie('token',token,{})
        
        res.status(200).json({message:"Login Successfully",data:userLogin})


        const loginOtp=()=>{
            const randomNum = Math.random() * 900000
            return Math.floor(100000 + randomNum)
         }
         const OTP=loginOtp()

        const transporter=nodemailer.createTransport({
            service:'gmail',
            auth:{
                user:process.env.EMAIL_USERNAME,
                pass:process.env.EMAIL_USERPASSWORD
            }
        })

        const mailOptions={
            from:process.env.EMAIL_USERNAME,
            to:'lakshmanan@elonnativesystem.com',
            subject:"Login Verifycation OTP",
            text:`Your Login Verifycation OTP is ${OTP}`
        }

        transporter.sendMail(mailOptions,function(error,info){
            if(error){
                   console.log(error)
            }else{
                console.log("Email send successfully")
            }
        })

        await loginTablemodel.deleteMany({ Email });

        const loginTable=new loginTablemodel({
            Otp:OTP,
            Email,
            Password:user.Password
        })
        await loginTable.save()
       

    }catch(error){
        res.status(500).json({message:"Internal Server Error"})
    }
}

exports.secretkey=async(req,res)=>{
    const { Otp } = req.body;

  if (!Otp) {
    return res.status(400).json({ message: 'OTP input is required.' });
  }

  try {
  
    const latestOtp = await loginTablemodel.findOne().sort({ createdAt: -1 });

    if (!latestOtp) {
      return res.status(404).json({ message: 'No OTP found.' });
    }

    
    if (latestOtp.Otp === Otp) {
      return res.status(200).json({ message: 'OTP verified successfully!' });
    } else {
      return res.status(400).json({ message: 'Invalid OTP. Please try again.' });
    }
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error.', error });
  }
}
