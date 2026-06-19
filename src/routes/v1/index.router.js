import { Router } from 'express'
import { userRouter } from './user.router.js'
import { workspaceRouter } from './workspace.router.js'

export const v1router = Router()
v1router.use('/users', userRouter)
v1router.use('/workspace', workspaceRouter)
