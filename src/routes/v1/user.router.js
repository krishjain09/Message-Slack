import { Router } from 'express'
import Status from 'http-status-codes'
import { signUpController } from '../../controllers/user.controller.js'
import { validateRequestBody } from '../../validators/zodValidator.js'
import { userSignupSchema } from '../../validators/userSignupSchema.js'
export const userRouter = Router()

userRouter.get('/', (req, res) => {
  res.status(Status.OK).send('OK')
})

userRouter.post(
  '/signup',
  validateRequestBody(userSignupSchema),
  signUpController
)
