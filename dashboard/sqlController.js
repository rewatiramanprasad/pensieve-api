const { query } = require("../utility/db");
const { ValidationError } = require("../utility/errorHandler");

const getAll=async(next)=>{
    // let generateQuery={
    //     0:`DeviceId='${rest[0]}'`,
    //     1:`DeviceType like '%${rest[1]}%'`
    // }
    // let str='';
    // for(let data=0;data<rest.length-1;data++){
    //     if(rest[data].length>0){
    //         str+=generateQuery[data]+' and ';
    //     } 
    // }
    // if(str==''){
        // str=`where (DeviceId,Timestamp)in (select DeviceId ,max(Timestamp) from summary group by DeviceId) and `+str;
        // str=str.slice(0,str.length-4);
        // str+=`order by ${rest[rest.length-1]} Asc`;
   // }
    try {
        let mainQuery=`select * from summary where (DeviceId,Timestamp)in (select DeviceId ,max(Timestamp) from summary group by DeviceId)`
    console.log(mainQuery);
    let result=await query(mainQuery);
    console.log(result)
    return result;
        
    } catch (error) {
        console.log(error)
        next(e)
    }

};

const getDetails=async(deviceId,deviceType)=>{
    let result={};
    
    let strQuery1=`select * from summary where DeviceId='${deviceId}'and DeviceType='${deviceType}'`
    const data=await query(strQuery1);
    console.log(data);
    let strQuery2=`SELECT COUNT(Timestamp)*5 AS totaltime,
                    COUNT(Timestamp) AS totalcount,
                    LOCATION,
                    ROUND((COUNT(Timestamp)*100)/SUM(COUNT(Timestamp)) OVER(),0) AS percentage
                    FROM summary 
                    WHERE DeviceId='${deviceId}' AND DeviceType='${deviceType}' 
                    GROUP BY location`;
    const pieData= await query(strQuery2);
    console.log(pieData);
    result.table=data;
    result.pieChart=pieData;
    console.log(result);
    return [result];

};
module.exports={getAll,getDetails};