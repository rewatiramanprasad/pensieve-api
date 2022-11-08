const joi=require('joi');
const { ValidationError }=require('../utility/errorHandler');

const isValidSignup=async (req,res,next)=>{
    const data=req.body;
    const schema=joi.object({
        email:joi.string()
        .email({minDomainSegments:2,tlds:{allow:['com','net']}})
        .required(),
        password:joi.string().required()
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

const isValidLogin=async (req,res,next)=>{
    const data=req.body;
    const schema=joi.object({
        email:joi.string()
        .email({minDomainSegments:2,tlds:{allow:['com','net']}})
        .required(),
        password:joi.string().required()
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

module.exports={isValidSignup,isValidLogin}