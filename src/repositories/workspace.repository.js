import { get } from 'mongoose'
import { Workspace } from '../schema/workspaces.js'
import { crudRepository } from './crud.repository.js'
import { ClientError } from '../utils/errors/clientError.js'
import { StatusCodes } from 'http-status-codes'
import { userRepository } from './user.repository.js'
import { channelRepository } from './channel.repository.js'

export const workspaceRepository = {
  ...crudRepository(Workspace),
  getByJoinCode: async function (joinCode) {
    return await Workspace.findOne({ joinCode })
  },
  getAllChannelsByWorkspaceId: async function (workspaceId) {
    const workspace = await Workspace.findById(workspaceId).populate('channels')
    return workspace ? workspace.channels : []
  },
  getAllMembersByWorkspaceId: async function (workspaceId) {
    const workspace =
      await Workspace.findById(workspaceId).populate('members.user')
    return workspace ? workspace.members : []
  },
  addMemberToWorkspace: async function (workspaceId, userId, role) {
    const workspace = await Workspace.findById(workspaceId)

    if (!workspace) {
      throw new ClientError({
        explanation: 'Invalid data sent from the client.',
        message: 'Workspace not found',
        statusCode: StatusCodes.NOT_FOUND
      })
    }

    const isValidUser = await userRepository.getById(userId)
    if (!isValidUser) {
      throw new ClientError({
        explanation: 'Invalid data sent from the client.',
        message: 'User not found',
        statusCode: StatusCodes.NOT_FOUND
      })
    }

    const isAlreadyMember = workspace.members.find(
      (member) => member.user.toString() === userId.toString()
    )

    if (isAlreadyMember) {
      throw new ClientError({
        explanation: 'Invalid data sent from the client.',
        message: 'Already member of workspace',
        statusCode: StatusCodes.CONFLICT
      })
    }

    const validUser = workspace.members.push({ user: userId, role })
    return await workspace.save()
  },

  addChannelToWorkspace: async function (workspaceId, channelName) {
    const workspace = await Workspace.findById(workspaceId).populate('channels')

    if (!workspace) {
      throw new ClientError({
        explanation: 'Invalid data sent from the client.',
        message: 'Workspace not found',
        statusCode: StatusCodes.NOT_FOUND
      })
    }

    const channelAlreadyExists = workspace.channels.find(
      (channel) => channel.name === channelName
    )

    if (channelAlreadyExists) {
      throw new ClientError({
        explanation: 'Invalid data sent from the client.',
        message: 'Channel Already exists',
        statusCode: StatusCodes.CONFLICT
      })
    }
    const channel = channelRepository.create({ channelName })

    workspace.channels.push(channel)
    await workspace.save()
    return workspace
  },

  fetchAllWorkspacesByMemberId: async function (memberId) {
    return await Workspace.find({ 'members.user': memberId })
  }
}
