const {queryWithPara}=require('../utility/db');
const crypto=require('crypto-js');
const {response} = require('../utility/response');
const {newUser,checkUser}=require('./sqlController');
const { ValidationError } = require('../utility/errorHandler');
const { exist } = require('joi');
const userExist=async(username)=>{
const sql="select * from login where username=$1 "
const result=await queryWithPara(sql,[username]);
console.log(result);
if(result.length>=1){
    return true
}
return false;
}
const signupController=async(req,res,next)=>{
    try {
    let username=req.body.email;
    let password=req.body.password;
    //console.log(req);
    console.log(username,password);
    let decPassword=crypto.MD5(password);
    console.log(decPassword)
    if(await userExist(username)){
         res.status(200).send(response([],false,"user already exist")).end();
       // next(new ValidationError("User already exist"))   
     }else{
    let result=await newUser(username,decPassword,next);
    console.log(decPassword+"");
    console.log(result)
    res.status(200).send(response([],true,"user created successfully")).end();
     }
    
        } catch (e) {
           next(e)
        }
    }

const loginController=async(req,res,next)=>{
    try {
        let username=req.body.email;
    let password=req.body.password;
    let userCheck=await checkUser(username ,next);
    console.log(userCheck);
    let result;
    let status=400;
    // if(userCheck.length==1){
    //     let passwordMd5=crypto.MD5(password)+"";
    //     console.log(passwordMd5,userCheck[0].password);
    //     if(passwordMd5===userCheck[0].password){
    //         result=response(true," login successful");
    //         status=200;
    //     }else {
    //         result=response(false,"wrong combination of user and password");
    //     }
    // }
    // }else{
    //     result=response(false,"wrong combination of user and password");
    // }
    if(userCheck.length==1){
    let passwordMd5=crypto.MD5(password)+"";
        console.log(passwordMd5,userCheck[0].password);
        if(passwordMd5===userCheck[0].password){
           res.status(200).send(response([],true,"user login successfull")).end();
        }else {
         next(new ValidationError("wrong combination of user and password"))
        }
    }
    } catch (e) {
        next(e)
    }
    
    }

    module.exports={ signupController,loginController};
    