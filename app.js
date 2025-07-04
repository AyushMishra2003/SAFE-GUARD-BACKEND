import express from 'express'
import cookieParser from 'cookie-parser'
import {config} from 'dotenv'
import morgan from 'morgan'

import cors from 'cors'
import userRouter from './route/user.route.js'
import errorMiddleware from './middlewares/error.middleware.js'
import groupRouter from './route/group.routes.js'




config()


const app=express()
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended:true}))

app.use(cors({
   origin:[process.env.FRONTEND_URL],
   credentials:true
}))

app.use(morgan('dev'))


app.use("/api/v1/user",userRouter)
app.use("/api/v1/group",groupRouter)


// app.use(errorMiddleware)
app.use('/',(req,res)=>{
   res.status(200).json({
      message:"Server is running",
 
   })
})



app.all('*',(req,res)=>{
    res.status(404).send('OOPS!! 404 NOT FOUND')
})



app.use(errorMiddleware);





export default app