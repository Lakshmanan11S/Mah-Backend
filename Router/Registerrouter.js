const express=require('express');
const registerControler=require('../Controler/Registercontroler');
const register=express.Router();

register.post('/register',registerControler.register)
register.get('/getallregister',registerControler.getAllRegister)

module.exports=register;