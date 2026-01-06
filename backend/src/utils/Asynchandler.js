const AsyncHandler=(requestHandler)=>{
    return (req,res,next)=>{
        Promise(requestHandler(req,res,next)).resolve.catch((err)=>next(err))
    }

}
export {AsyncHandler}