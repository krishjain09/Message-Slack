import { StatusCodes } from 'http-status-codes'

export function validateRequestBody(schema) {
  return async function (req, res, next) {
    try {
      const data = await schema.parseAsync(req.body)
      next()
    } catch (error) {
      console.log('(Zod Validator)Validation error details: ', error.issues)
      //   console.log('Type ', typeof error.message)
      let explanation = []
      for (const issue of error.issues) {
        explanation.push(`${issue.path} : ${issue.message}`)
      }
      res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: 'Validation error',
        explanation: explanation
      })
    }
  }
}
