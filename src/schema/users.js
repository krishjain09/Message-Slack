import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      match: [
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        'Please enter a valid email'
      ]
    },
    password: {
      type: String,
      required: [true, 'Password is required']
    },
    username: {
      type: String,
      required: [true, 'Username is required'],
      unique: true,
      match: [
        /^[a-zA-Z0-9_]+$/,
        'Username can only contain letters, numbers, and underscores'
      ]
    },
    avatar: {
      type: String
    }
  },
  { timestamps: true }
)

const User = mongoose.model('User', userSchema)

userSchema.pre('save', function (next) {
  const user = this
  user.avatar = `https://robohash.org/${user.username}`
  next()
})

export default User
