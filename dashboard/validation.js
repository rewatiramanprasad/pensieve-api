const joi=require('joi');
const { ValidationError }=require('../utility/errorHandler');

const isValidDetails=async (req,res,next)=>{
    const data=req.query;
    const schema=joi.object({
        deviceId:joi.string().required(),
        deviceType:joi.string().required()
    })
    const valid=await schema.validate(data);
    if(valid.error){
        console.log(valid.error);
        next(new ValidationError(valid.error))
    }
    else{
        next()
    }
}



module.exports={isValidDetails}