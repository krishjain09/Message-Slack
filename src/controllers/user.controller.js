import { StatusCodes } from 'http-status-codes'
import { signUpService } from '../services/user.service.js'

export async function signUpController(req, res) {
  try {
    const newUser = await signUpService(req.body)
    res.status(StatusCodes.CREATED).json({
      message: 'User created successfully',
      data: newUser,
      status: 'success'
    })
  } catch (error) {
    res.status(error.statusCode).json({
      success: false,
      name: error.name,
      message: error.message,
      explanation: error.explanation
    })
  }
}
