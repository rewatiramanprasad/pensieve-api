const {queryWithPara}=require('../utility/db');
const crypto=require('crypto-js');
const {response} = require('../utility/response');
const {newUser,checkUser}=require('./sqlController');
const { ValidationError } = require('../utility/errorHandler');

const signupController=async(req,res,next)=>{
    try {
    let user=req.body.email;
    let password=req.body.password;
    //console.log(req);
    console.log(user,password);
    let decPassword=crypto.MD5(password);
    let result=await newUser(user,decPassword,next);
    console.log(decPassword+"");
    console.log(result)
    if(typeof result!='undefined'){
        res.status(200).send(response(true,"user created successful",[])).end();
    }
    
        } catch (e) {
           next(e)
        }
    }

const loginController=async(req,res,next)=>{
    try {
        let user=req.body.email;
    let password=req.body.password;
    let userCheck=await checkUser(user ,next);
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
           res.status(200).send(response(true,"user login successfull")).end();
        }else {
         next(new ValidationError("wrong combination of user and password"))
        }
    }
    } catch (e) {
        next(e)
    }
    
    }

    module.exports={ signupController,loginController};
    