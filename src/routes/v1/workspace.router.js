import { Router } from 'express'
import Status from 'http-status-codes'
import { createWorkspaceSchema } from '../../validators/createWorkspaceSchema.js'
import { isAuthenticated } from '../../middlewares/authMiddleware.js'
import {
  addMemberToWorkspaceController,
  createWorkspaceController,
  fetchAllWorkspacesByMemberIdController,
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

workspaceRouter.post(
  '/add-member',
  isAuthenticated,
  addMemberToWorkspaceController
)

workspaceRouter.post(
  '/remove-member',
  isAuthenticated,
  removeMemberFromWorkspaceController
)
