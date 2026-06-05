import { Router } from 'express'
import Status from 'http-status-codes'
import { signUpController } from '../../controllers/user.controller.js'
export const userRouter = Router()

userRouter.get('/', (req, res) => {
  res.status(Status.OK).send('OK')
})

userRouter.post('/signup', signUpController)
