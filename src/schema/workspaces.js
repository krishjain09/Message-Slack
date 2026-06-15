import mongoose from 'mongoose'

const workspaceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Workspace name is required'],
    unique: true
  },
  description: {
    type: String
  },
  channels: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Channel'
    }
  ],
  members: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
      role: {
        type: String,
        enum: ['admin', 'member'],
        default: 'member'
      }
    }
  ],
  joinCode: {
    type: String,
    required: [true, 'Join code is required'],
    unique: true
  }
})

export const Workspace = mongoose.model('Workspace', workspaceSchema)
