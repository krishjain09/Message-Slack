import { Router } from 'express'
import Status from 'http-status-codes'
import { getChannelByIdController } from '../../controllers/channel.controller.js'

export const channelRouter = Router()

channelRouter.get('/:channelId', getChannelByIdController)
