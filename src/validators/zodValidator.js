import { StatusCodes } from "http-status-codes"

export function validateRequestBody(schema){
    return  async function (req, res, next) {
        try{
            const data =await schema.parseAsync(req.body)
            next()
        }catch(error){
            res.status(StatusCodes.BAD_REQUEST).json({
                success: false,
                message : 'Validation error'
            })
        }
    }
}