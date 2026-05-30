import { Router } from 'express'
import Status from 'http-status-codes'
export const userRouter = Router()

userRouter.get('/', (req, res) => {
  res.status(Status.OK).send('OK')
})
