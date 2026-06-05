import express from 'express'
import STATUS from 'http-status-codes'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import { connectDb } from './config/dbConfig.js'
import { v1router } from './routes/v1/index.router.js'
dotenv.config()

const app = express()
const PORT = process.env.PORT

app.use(express.json())

app.use('/api/v1',v1router)
app.get('/ping', (req, res) => {
  res.status(STATUS.OK).send('Hello World!!!')
})

app.listen(PORT, () => {
  console.log(`Server is running at : ${PORT}`)
  connectDb()
})
