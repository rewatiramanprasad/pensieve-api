const {queryWithPara}=require('../utility/db');
const { ValidationError } = require('../utility/errorHandler');
const newUser=async(email,decPassword,next)=>{


    let query=`insert into login(username,password) values(?,?)`;
    let result=await queryWithPara(query,[email,""+decPassword],next);
    console.log(result);
    if(typeof result!='undefined'){
        return result;
    }
    // else{
    //     next(new ValidationError("user already exist"));
    // }
        
  
}
const checkUser=async(user,next)=>{
    let query=`select * from login where username=? `
    let result=await queryWithPara(query,[user],next);
    if(result.length==1){
        return result;
    }else{
        next(new ValidationError('wrong combination of user and password'))
        return [];
    }
}
module.exports={newUser ,checkUser}