import { customAlphabet } from 'nanoid'
import { workspaceRepository } from '../repositories/workspace.repository.js'
import { ValidationError } from '../utils/errors/validationerror.js'
import { userRepository } from '../repositories/user.repository.js'
import { ClientError } from '../utils/errors/clientError.js'
import { StatusCodes } from 'http-status-codes'

const nanoid = customAlphabet('ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789', 6)

export async function createWorkspaceService(workspaceData) {
  try {
    let exists = true
    let code = ''
    while (exists) {
      code = nanoid()
      // console.log(code)
      exists = await workspaceRepository.getByJoinCode(code)
      // console.log(exists)
    }
    const workspaceDataCpy = { name: workspaceData.name, joinCode: code }

    const response = await workspaceRepository.create(workspaceDataCpy)
    // console.log(response)
    const response2 = await workspaceRepository.addMemberToWorkspace(
      response.id,
      workspaceData.owner,
      'admin'
    )
    // console.log(response2)
    return response2
  } catch (error) {
    // console.log('Printing error: ', error)
    if (error.name === 'ValidationError') {
      throw new ValidationError({ error: error.errors }, error.message)
    }
    if (error.name === 'MongoServerError' && error.code === 11000) {
      throw new ValidationError(
        {
          error: {
            message:
              'Duplicate key error: Workspace with same name already exists.'
          }
        },
        'Duplicate key error'
      )
    }
    throw error
  }
}

export async function fetchAllWorkspacesByMemberIdService(userId) {
  console.log('Fetching all workspaces for user: ', userId)
  const response =
    await workspaceRepository.fetchAllWorkspacesByMemberId(userId)
  return response
}
//workspaceId, userId, role
export async function addMemberToWorkspaceService(data) {
  try {
    console.log('I am here in addMemberToWorkspaceService')
    console.log(data)
    const { workspaceId, userId, role, owner } = data

    //step 1 : checking whether the authenticated user is admin or not
    //if admin -> he can add member to workspace else not.

    const workspace = await workspaceRepository.getById(workspaceId)
    console.log('Workspace details: ', workspace)
    if (!workspace) {
      throw new ClientError({
        message: 'Workspace not found with the provided id.',
        explanation: 'Invalid data sent from the client.',
        statusCode: StatusCodes.NOT_FOUND
      })
    }
    let admin = false
    for (let member of workspace.members) {
      if (
        member.user.toString() === owner.toString() &&
        member.role === 'admin'
      ) {
        admin = true
        break
      }
    }
    console.log('Admin or not: ', admin)

    if (!admin) {
      throw new ClientError({
        message: 'Only admin can add members to workspace.',
        explanation: 'Invalid data sent from the client.',
        statusCode: StatusCodes.FORBIDDEN
      })
    }

    //step 2: Since we are adding members to workspace there should
    // be atleast one channel present in workspace so user can chat
    //for this we can check if there is only one member present i.e admin itself
    //so we have to add one channel (named as general)
    // if there are 2 or more than 2 members means workspace has atleast one channel
    // so we can skip adding channel to workspace

    let flag = false
    if (workspace.members.length === 1) {
      flag = true
    }

    //Now there can be possibility that user is already memeber of workspace

    for (let member of workspace.members) {
      if (member.user.toString() === userId.toString()) {
        throw new ClientError({
          message: 'User is already a member of workspace.',
          explanation: 'Invalid data sent from the client.',
          statusCode: StatusCodes.CONFLICT
        })
      }
    }

    const response = await workspaceRepository.addMemberToWorkspace(
      workspaceId,
      userId,
      role
    )

    if (flag) {
      await workspaceRepository.addChannelToWorkspace(workspaceId, 'general')
    }
    return response
  } catch (error) {
    if (error.name === 'ValidationError') {
      throw new ValidationError({ error: error.errors }, error.message)
    }
    throw error
  }
}

export async function removeMemberFromWorkspaceService(data) {
  try {
    // console.log('I am here in removeMemberFromWorkspaceService')
    const { workspaceId, userId, owner } = data

    const workspace = await workspaceRepository.getById(workspaceId)
    // console.log('Workspace details: ', workspace)
    if (!workspace) {
      throw new ClientError({
        message: 'Workspace not found with the provided id.',
        explanation: 'Invalid data sent from the client.',
        statusCode: StatusCodes.NOT_FOUND
      })
    }
    let admin = false
    for (let member of workspace.members) {
      if (
        member.user.toString() === owner.toString() &&
        member.role === 'admin'
      ) {
        admin = true
        break
      }
    }
    if (!admin) {
      throw new ClientError({
        message: 'Only admin can remove members from workspace.',
        explanation: 'Invalid data sent from the client.',
        statusCode: StatusCodes.FORBIDDEN
      })
    }
    const response = await workspaceRepository.removeMemberFromWorkspace(
      workspaceId,
      userId
    )
    // console.log('Response from removeMemberFromWorkspaceService: ', response)
    return response
  } catch (error) {
    if (error.name === 'ValidationError') {
      throw new ValidationError({ error: error.errors }, error.message)
    }
    throw error
  }
}

export async function addChannelToWorkspaceService(data) {
  try {
    const { workspaceId, channelName, owner } = data
    const workspace = await workspaceRepository.getById(workspaceId)

    if (!workspace) {
      throw new ClientError({
        message: 'Workspace not found with the provided id.',
        explanation: 'Invalid data sent from the client.',
        statusCode: StatusCodes.NOT_FOUND
      })
    }
    let admin = false
    for (let member of workspace.members) {
      if (
        member.user.toString() === owner.toString() &&
        member.role === 'admin'
      ) {
        admin = true
        break
      }
    }
    if (!admin) {
      throw new ClientError({
        message: 'Only admin can add channels to workspace.',
        explanation: 'Invalid data sent from the client.',
        statusCode: StatusCodes.FORBIDDEN
      })
    }

    const response = await workspaceRepository.addChannelToWorkspace(
      workspaceId,
      channelName
    )
    return response
  } catch (error) {
    if (error.name === 'ValidationError') {
      throw new ValidationError({ error: error.errors }, error.message)
    }
    throw error
  }
}

export async function removeChannelFromWorkspaceService(data) {
  try {
    const { workspaceId, channelName, owner } = data

    const workspace = await workspaceRepository.getById(workspaceId)
    // console.log('Workspace details: ', workspace)
    if (!workspace) {
      throw new ClientError({
        message: 'Workspace not found with the provided id.',
        explanation: 'Invalid data sent from the client.',
        statusCode: StatusCodes.NOT_FOUND
      })
    }
    let admin = false
    for (let member of workspace.members) {
      if (
        member.user.toString() === owner.toString() &&
        member.role === 'admin'
      ) {
        admin = true
        break
      }
    }
    if (!admin) {
      throw new ClientError({
        message: 'Only admin can remove members from workspace.',
        explanation: 'Invalid data sent from the client.',
        statusCode: StatusCodes.FORBIDDEN
      })
    }
    const response = await workspaceRepository.removeChannelFromWorkspace(
      workspaceId,
      channelName
    )
    // console.log('Response from removeChannelFromWorkspaceService: ', response)
    return response
  } catch (error) {
    if (error.name === 'ValidationError') {
      throw new ValidationError({ error: error.errors }, error.message)
    }
    throw error
  }
}

export async function fetchWorkspaceByJoinCodeService(joinCode) {
  try {
    const response = await workspaceRepository.getByJoinCode(joinCode)

    if (!response) {
      throw new ClientError({
        message: 'Workspace not found with the provided join code.',
        explanation: 'Invalid data sent from the client.',
        statusCode: StatusCodes.NOT_FOUND
      })
    }
    await response.populate('channels')
    await response.populate('members.user')
    return response
  } catch (error) {
    throw new ClientError({
      message: 'Workspace not found with the provided join code.',
      explanation: 'Invalid data sent from the client.',
      statusCode: StatusCodes.NOT_FOUND
    })
  }
}
