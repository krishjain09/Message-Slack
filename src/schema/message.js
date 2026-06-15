import mongoose from 'mongoose'

const messageSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: [true, 'Message content is required']
    },
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Sender ID is required']
    },
    channelId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Channel',
      required: [true, 'Channel ID is required']
    },
    workspaceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Workspace',
      required: [true, 'Workspace ID is required']
    }
  },
  { timestamps: true }
)

export const Message = mongoose.model('Message', messageSchema)

/*
    kya message content hai?
    konsa user sending?
    konsa channel pe send kar raha hai?
*/
