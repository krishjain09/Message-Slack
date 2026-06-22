import { Router } from 'express'
import Status from 'http-status-codes'
import { createWorkspaceSchema } from '../../validators/createWorkspaceSchema.js'
import { isAuthenticated } from '../../middlewares/authMiddleware.js'
import {
  addChannelToWorkspaceController,
  addMemberToWorkspaceController,
  createWorkspaceController,
  fetchAllWorkspacesByMemberIdController,
  fetchWorkspaceByJoinCodeController,
  removeChannelFromWorkspaceController,
  removeMemberFromWorkspaceController
} from '../../controllers/workspace.controller.js'
import { validateRequestBody } from '../../validators/zodValidator.js'

export const workspaceRouter = Router()

workspaceRouter.get('/', (req, res) => {
  res.status(Status.OK).send('Workspace Router working fine.')
})

workspaceRouter.post(
  '/',
  validateRequestBody(createWorkspaceSchema),
  isAuthenticated,
  createWorkspaceController
)

workspaceRouter.get(
  '/users',
  isAuthenticated,
  fetchAllWorkspacesByMemberIdController
)

workspaceRouter.put(
  '/add-member',
  isAuthenticated,
  addMemberToWorkspaceController
)

workspaceRouter.delete(
  '/remove-member',
  isAuthenticated,
  removeMemberFromWorkspaceController
)

workspaceRouter.put(
  '/add-channel',
  isAuthenticated,
  addChannelToWorkspaceController
)

workspaceRouter.delete(
  '/remove-channel',
  isAuthenticated,
  removeChannelFromWorkspaceController
)

workspaceRouter.get(
  '/join-code/:joinCode',
  isAuthenticated,
  fetchWorkspaceByJoinCodeController
)
