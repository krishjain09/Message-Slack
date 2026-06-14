import { StatusCodes } from 'http-status-codes'
import jwt, { decode } from 'jsonwebtoken'
import userRepository from '../repositories/userRepository.js'

export function isAuthenticated(req, res, next) {
  try {
    const token = req.headers['x-access-token']
    console.log('Received token: ', token)
    if (!token) {
      return res.status(StatusCodes.FORBIDDEN).json({
        message: 'No token provided. Access denied.'
      })
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    if (!decoded) {
      return res.status(StatusCodes.FORBIDDEN).json({
        message: 'Invalid token. Access denied.'
      })
    }
    console.log('Decoded token: ', decoded)

    req.userId = decoded.id
    req.username = decoded.username

    next()
  } catch (error) {
    console.error('Authentication error: ', error)
    if (error.name === 'JsonWebTokenError') {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        message: 'Invalid token. Access denied.'
      })
    }
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: 'An error occurred while processing the token.'
    })
  }
}
