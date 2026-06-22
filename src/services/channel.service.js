import { channelRepository } from '../repositories/channel.repository.js'
import StatusCodes from 'http-status-codes'
import { ClientError } from '../utils/errors/clientError.js'
export async function getChannelByIdService(channelId) {
  try {
    const channel = await channelRepository.getById(channelId)
    if (!channel) {
      throw new ClientError({
        explanation: 'Invalid data sent from the client.',
        message: 'Channel not found',
        statusCode: StatusCodes.NOT_FOUND
      })
    }
    return channel
  } catch (error) {
    throw error
  }
}
