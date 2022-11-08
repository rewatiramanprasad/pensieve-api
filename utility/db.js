//const data = require("../config/config.json");
const mysql = require(`mysql-await`);
const { ValidationError } = require("./errorHandler");
const string = {
  host: "sql311.epizy.com",
  user: "epiz_32955902",
  password: "ldbl1xkHgLvVCi4",
  database: "epiz_32955902_login",
  throwErrors: false,
};



const query = async (str) => {
try{
    const connection=mysql.createConnection(string);

//   connection.on(`error`, (err) => {
//     console.error(`Connection error ${err.code}`);
//   });
  let result = await connection.awaitQuery(`${str}`);
  connection.awaitEnd();
  return result;
}catch(error){
    console.log(error.sql);
}
};

const queryWithPara = async (str, arr,next) => {
    
//   const connection = mysql.createConnection(string);

//   connection.on(`error`, (err) => {
//     console.error(`Connection error ${err}`);
//   });
try {
    const pool=mysql.createPool(string);
    const connection = await pool.awaitGetConnection();
  
  connection.on(`error`, (err) => {
    console.error(`Connection error ${err}`);
    if(err.code==='ER_DUP_ENTRY'){
      next(new ValidationError('user already exist'))
    }else{
    next(err);
    }
  });
    let result = await connection.awaitQuery(`${str}`, arr);
    connection.release();

  return result;
} catch (error) {
   // console.log("ye lo",error.sql)
    next(error)
}
  
};
// (async()=>{
// let res=await queryWithPara(`insert into login(username,password)values(?,?)`,["raman","rewati"]);
// console.log(res)})();

module.exports = {query,queryWithPara};
