const express=require('express');
const bodyparser=require('body-parser');
const cors=require('cors');
const mongoose=require('mongoose');
const cookieparser=require('cookie-parser');
const PORT=4500;
require('dotenv').config();

const registerRouter=require('./Router/Registerrouter')
const loginRouter=require('./Router/Loginrouter')


const app=express()

app.use(express.json())
app.use(bodyparser.json())
app.use(cors())
app.use(cookieparser())

mongoose.connect(process.env.DATABASE_URL)

.then(()=>{console.log("Mongodb is connected")})
.catch(()=>{console.log("Mongodb is not connected")});

app.get('/',(req,res)=>{
    res.send("Initial Page")
})

app.use('/api',registerRouter)
app.use('/api',loginRouter)


app.listen(PORT,()=>{console.log("Server is running on:",PORT)})