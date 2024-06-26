// const { query } = require("../utility/db");

const {response} = require("../utility/response");
const {getAll,getDetails}=require('./sqlController');
const hello=async(req,res,next)=>{
    try {
    res
    .status(200)
    .send(response([],true,"hello world"))
    .end();

    } catch (e) {
        next(e);
    }
    
    
}
const detailController=async(req,res,next)=>{
    try {
    const deviceId=req.query.deviceId;
    const deviceType=req.query.deviceType;
    console.log(deviceId);
    console.log(deviceType);
    
    const result=await getDetails(deviceId ,deviceType);
    res
    .status(200)
    .send(response(result,true))
    .end();
        
    } catch (e) {
        next(e)
    }
    
}
const summaryController= async (req, res,next) => {
    // console.log(req);
    // const page=parseInt(req.query.page);
    // const limit=parseInt(req.query.limit);
    // let sort=req.query.sort ||"";
    // let deviceId=req.query.deviceId ||"";
    // let deviceType=req.query.deviceType||"";
    // const startIndex=(page-1)*limit;
    // const endIndex=page*limit;
try {
    let result = await getAll() ;
//   result=result.slice(startIndex,endIndex);
  res
    .status(200)
    .send(response(result,true))
    .end();
    
} catch (e) {
    next(e)
}

  
}

module.exports={detailController,summaryController,hello}