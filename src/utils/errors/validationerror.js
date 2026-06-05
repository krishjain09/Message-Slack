import { StatusCodes } from 'http-status-codes'

export class ValidationError extends Error {
  constructor(errorDetails, message) {
    super(message)
    console.log('Validation error details: ', errorDetails.error)
    let explanation = []

    for (const key of Object.keys(errorDetails.error)) {
      explanation.push(`${key}: ${errorDetails.error[key]}`)
    }
    this.explanation = explanation
    this.name = 'ValidationError'
    this.statusCode = StatusCodes.BAD_REQUEST
  }
}
