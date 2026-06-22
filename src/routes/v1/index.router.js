import { Router } from 'express'
import { userRouter } from './user.router.js'
import { workspaceRouter } from './workspace.router.js'
import { channelRouter } from './channel.router.js'

export const v1router = Router()
v1router.use('/users', userRouter)
v1router.use('/workspace', workspaceRouter)
v1router.use('/channels', channelRouter)
