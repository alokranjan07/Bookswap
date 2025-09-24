class ApiError extends Error{
    constructor(
        statusCode,
        data,
        message,
        errors=[],
        stack,
    ){
        super(message)
        this.statusCode=statusCode,
        this.message=message,
        this.data=data,
        this.errors=errors
        if(stack){
            this.stack=stack
        }
        else{
            Error.captureStackTrace(this,this.constructor)
        }
        
    }
}
export {ApiError}