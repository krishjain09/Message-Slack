import { StatusCodes } from 'http-status-codes'
export class ClientError extends Error {
  constructor(error) {
    super()
    this.name = 'ClientError'
    this.message = error.message
    this.statusCode = error.statusCode || StatusCodes.BAD_REQUEST
    this.explanation = error.explanation
  }
}
