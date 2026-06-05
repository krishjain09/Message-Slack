import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
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

userSchema.pre('save', async function () {
  try {
    console.log('Pre-save hook triggered for user')
    const user = this
    if (user.isModified('password')) {
      const salt = bcrypt.genSaltSync(10)
      const hash = bcrypt.hashSync(user.password, salt)
      user.password = hash
    }

    user.avatar = `https://robohash.org/${user.username}`
    console.log('Avatar set to: ', user.avatar)
    // next()
  } catch (err) {
    console.log('Error in pre-save hook: ', err)
  }
})

const User = mongoose.model('User', userSchema)

export default User
