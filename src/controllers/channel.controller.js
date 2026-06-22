import { getChannelByIdService } from '../services/channel.service.js'
import StatusCodes from 'http-status-codes'
export async function getChannelByIdController(req, res) {
  try {
    const channel = await getChannelByIdService(req.params.channelId)
    res.status(StatusCodes.OK).json({
      message: `Channel fetched successfully`,
      data: channel,
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
