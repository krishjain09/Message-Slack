import mongoose from 'mongoose'

export async function connectDb() {
  try {
    await mongoose.connect(process.env.mongo_uri)
    console.log('Connected Succesfully')
  } catch (err) {
    console.log('Error in connecting database', err)
  }
}
