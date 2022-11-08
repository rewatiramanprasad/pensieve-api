const data = require("../config/config.json");
const mysql = require(`mysql-await`);
const { ValidationError } = require("./errorHandler");
const string = {
  host: data["host"],
  user: data["user"],
  password: data["password"],
  database: data["db"],
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
