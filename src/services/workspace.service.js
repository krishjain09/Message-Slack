import { customAlphabet } from 'nanoid'
import { workspaceRepository } from '../repositories/workspace.repository.js'
import { ValidationError } from '../utils/errors/validationerror.js'
import { userRepository } from '../repositories/user.repository.js'

const nanoid = customAlphabet('ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789', 6)
let exists = true
let code = ''

export async function createWorkspaceService(workspaceData) {
  try {
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
  }
}

export async function fetchAllWorkspacesByMemberIdService(userId) {
  const response =
    await workspaceRepository.fetchAllWorkspacesByMemberId(userId)
  return response
}
//workspaceId, userId, role
export async function addMemberToWorkspaceService(data) {
  const { workspaceId, userId, role, owner } = data
  //step 1 : checking whether the authenticated user is admin or not
  //if admin -> he can add member to workspace else not.
  
  const workspace = await workspaceRepository.getById(workspaceId)
  console.log('Workspace details: ', workspace)
  // if(user.)
}
