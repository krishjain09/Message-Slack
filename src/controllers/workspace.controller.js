import {
  addMemberToWorkspaceService,
  createWorkspaceService,
  fetchAllWorkspacesByMemberIdService
} from '../services/workspace.service.js'
import { StatusCodes } from 'http-status-codes'
export async function createWorkspaceController(req, res) {
  try {
    console.log('I am here in createWorkspaceController')
    console.log(req.body)
    const data = { ...req.body, owner: req.userId }

    const newWorkspace = await createWorkspaceService(data)
    console.log('New workspace : ', newWorkspace)
    res.status(StatusCodes.CREATED).json({
      message: 'Workspace created successfully',
      data: newWorkspace,
      status: 'Success'
    })
  } catch (error) {
    res.status(error.statusCode).json({
      success: false,
      name: error.name,
      message: error.message,
      explanation: error.explanation
    })
  }
}

export async function fetchAllWorkspacesByMemberIdController(req, res) {
  const data = await fetchAllWorkspacesByMemberIdService(req.userId)

  res.status(StatusCodes.OK).json({
    message:
      data.length > 0
        ? 'Fetched all workspaces successfully'
        : 'User is not part of any workspace',
    data: data || [],
    status: 'Success'
  })
}

export async function addMemberToWorkspaceController(req, res) {
  try {
    const response = await addMemberToWorkspaceService({
      ...req.body,
      owner: req.userId
    })
    res.status(StatusCodes.OK).json({
      message: `Member added to workspace ${response.name} successfully`,
      data: response,
      status: 'Success'
    })
  } catch (error) {
    res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      name: error.name,
      message: error.message,
      explanation: error.explanation
    })
  }
}
