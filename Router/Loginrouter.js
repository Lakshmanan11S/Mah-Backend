const express=require('express');
const loginControler=require('../Controler/Logincontroler');
const login=express.Router();

login.post('/login',loginControler.login)
login.post('/otpverify',loginControler.secretkey)

module.exports=login;