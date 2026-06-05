import { StatusCodes } from "http-status-codes";

export class ValidationError extends Error{
    constructor(errorDetails,message){
        super(message);
        let explanation = [];
        
        for (const key of Object.keys(errorDetails)) {
            explanation.push(`${key}: ${errorDetails[key].message}`);
        }
        this.explanation = explanation;
        this.name = "ValidationError";
        this.statusCode = StatusCodes.BAD_REQUEST;
    }
}
