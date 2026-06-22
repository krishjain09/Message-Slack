import {
  addMemberToWorkspaceService,
  createWorkspaceService,
  fetchAllWorkspacesByMemberIdService,
  removeMemberFromWorkspaceService,
  addChannelToWorkspaceService,
  removeChannelFromWorkspaceService,
  fetchWorkspaceByJoinCodeService
} from '../services/workspace.service.js'
import { StatusCodes } from 'http-status-codes'
export async function createWorkspaceController(req, res) {
  try {
    // console.log('I am here in createWorkspaceController')
    // console.log(req.body)
    const data = { ...req.body, owner: req.userId }

    const newWorkspace = await createWorkspaceService(data)
    // console.log('New workspace : ', newWorkspace)
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

export async function removeMemberFromWorkspaceController(req, res) {
  try {
    const response = await removeMemberFromWorkspaceService({
      ...req.body,
      owner: req.userId
    })
    res.status(StatusCodes.OK).json({
      message: `Member removed from workspace ${response.name} successfully`,
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

export async function addChannelToWorkspaceController(req, res) {
  try {
    const response = await addChannelToWorkspaceService({
      ...req.body,
      owner: req.userId
    })
    res.status(StatusCodes.OK).json({
      message: `Channel added to workspace ${response.name} successfully`,
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

export async function removeChannelFromWorkspaceController(req, res) {
  try {
    const response = await removeChannelFromWorkspaceService({
      ...req.body,
      owner: req.userId
    })
    res.status(StatusCodes.OK).json({
      message: `Channel removed from workspace ${response.name} successfully`,
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

export async function fetchWorkspaceByJoinCodeController(req, res) {
  try {
    console.log('Req params', req.params)
    const { joinCode } = req.params
    const workspace = await fetchWorkspaceByJoinCodeService(joinCode)
    res.status(StatusCodes.OK).json({
      message: `Workspace fetched successfully`,
      data: workspace,
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
