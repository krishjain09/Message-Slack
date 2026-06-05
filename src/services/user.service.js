import { userRepository } from '../repositories/user.repository.js'
import { ValidationError } from '../utils/errors/validationerror.js'

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
