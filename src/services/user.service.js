import { userRepository } from '../repositories/user.repository.js'
import { ValidationError } from '../utils/errors/validationerror.js'
import { ClientError } from '../utils/errors/clientError.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { StatusCodes } from 'http-status-codes'

export async function signUpService(data) {
  try {
    const newUser = await userRepository.create(data)
    return newUser
  } catch (error) {
    // console.log('Signup service error: ', error.errors)
    if (error.name === 'ValidationError') {
      throw new ValidationError({ error: error.errors }, error.message)
    }
    if (error.name === 'MongoServerError' && error.code === 11000) {
      throw new ValidationError(
        {
          error: {
            message:
              'Duplicate key error: A user with the same email or username already exists.'
          }
        },
        'Duplicate key error'
      )
    }
  }
}

export async function signInService(data) {
  try {
    const { email, username, password } = data
    const user = await userRepository.getByEmail(email)

    if (!user) {
      throw new ClientError({
        explanation: 'Invalid data sent from the client.',
        message: 'User not found with the provided email.',
        statusCode: StatusCodes.NOT_FOUND
      })
    }
    const hashedPassword = user.password

    const isMatch = await bcrypt.compare(password, hashedPassword)

    if (!isMatch) {
      throw new ClientError({
        explanation: 'Invalid data sent from the client.',
        message: 'Invalid password',
        statusCode: StatusCodes.UNAUTHORIZED
      })
    }

    const token = jwt.sign(
      { userId: user._id, username: user.username },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN
      }
    )
    console.log('JWT token generated: ', token)
    return {
      username: user.username,
      email: user.email,
      avatar: user.avatar,
      token
    }
  } catch (error) {
    console.log('User signin service error')
    throw error
  }
}
