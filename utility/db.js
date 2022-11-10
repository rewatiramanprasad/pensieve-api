//const data = require("../config/config.json");
// const mysql = require(`mysql-await`);
// const { ValidationError } = require("./errorHandler");
// const string = {
//   host: "sql311.epizy.com",
//   user: "epiz_32955902",
//   password: "ldbl1xkHgLvVCi4",
//   database: "epiz_32955902_login",
//   port:3306,
//   throwErrors: false,
// };
const {Client}=require('pg');
const connectionString='postgres://postgres:QnMoiQdVF0IuvkUb@db.rdbnvztwdvbhvwdqxpwj.supabase.co:6543/postgres'||process.env.dbstring;
const client=new Client({connectionString})

const query = async (str) => {
try{
// const connection=mysql.createConnection(string);

  client.connect();
  let result = await client.query(`${str}`);
  await client.end();
  return result.rows;
}catch(error){
    console.log(error.stack);
}
};

const queryWithPara = async (str, arr,next) => {
    
//   const connection = mysql.createConnection(string);

//   connection.on(`error`, (err) => {
//     console.error(`Connection error ${err}`);
//   });
try {
    // const pool=mysql.createPool(string);
    // const connection = await pool.awaitGetConnection();
  
  // connection.on(`error`, (err) => {
  //   console.error(`Connection error ${err}`);
  //   if(err.code==='ER_DUP_ENTRY'){
  //     next(new ValidationError('user already exist'))
  //   }else{
  //   next(err);
  //   }
  // });
  //   let result = await connection.awaitQuery(`${str}`, arr);
  //   connection.release();

  // return result;
  client.connect();
  let result = await client.query(`${str}`,arr);
  await client.end();
  return result.rows;
} catch (error) {
   // console.log("ye lo",error.sql)
    next(error)
}
  
};
// (async()=>{
// let res=await queryWithPara(`insert into login(username,password)values(?,?)`,["raman","rewati"]);
// console.log(res)})();

module.exports = {query,queryWithPara};
