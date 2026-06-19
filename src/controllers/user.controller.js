import { StatusCodes } from 'http-status-codes'
import { signUpService, signInService } from '../services/user.service.js'
import { fetchuserByUsernameService } from '../services/user.service.js'

export async function signUpController(req, res) {
  try {
    console.log(req.body)
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

export async function signInController(req, res) {
  try {
    const user = await signInService(req.body)
    res.status(StatusCodes.OK).json({
      message: 'User logged in successfully',
      data: user,
      status: 'Success'
    })
  } catch (error) {
    res.status(error.statusCode || StatusCodes.BAD_REQUEST).json({
      name: error.name,
      message: error.message,
      explanation: error.explanation,
      status: 'Failure'
    })
  }
}

export async function fetchUserByUsernameController(req, res) {
  try {
    console.log(req.body)
    const user = await fetchuserByUsernameService(req.body.username)
    res.status(StatusCodes.OK).json({
      message: 'User details fetched successfully',
      data: user,
      status: 'Success'
    })
  } catch (error) {
    res.status(error.statusCode || StatusCodes.BAD_REQUEST).json({
      name: error.name,
      message: error.message,
      explanation: error.explanation,
      status: 'Failure'
    })
  }
}
