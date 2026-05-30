import { Router } from 'express'
import { userRouter } from './user.router.js'

export const v1router = Router()
v1router.use('/users', userRouter)
