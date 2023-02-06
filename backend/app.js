const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
const dotEnv = require('dotenv').config()
//-- ROUTES --//
const postsRouter = require('./Routes/PostsRouter')
const userRouter = require('./Routes/UserRoutes')


const app = express()

app.use(bodyParser.json({limit:'30mb', extended:true}))
app.use(bodyParser.urlencoded({limit:'30mb', extended:true}))
app.use(cors())
// app.use(express.json())
// app.use(express.urlencoded())


mongoose.set("strictQuery", true);
const DB = mongoose.connect(process.env.MONGO_URI)

app.listen(process.env.PORT, DB,()=>{
    console.log('connected to db') 
    console.log('server is up and running')
   })


app.use('/api/posts',postsRouter)
app.use('/api/user',userRouter)