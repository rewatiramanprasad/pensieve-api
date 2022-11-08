//const data=require('./config/config.json');
const userRouter=require('./user/router');
const dashRouter=require('./dashboard/router');
const express=require('express');
const {error}=require('./utility/errorHandler');
const app=express();

app.use(express.json());
// app.use((req,res,next)=>{
// res.setHeader('Access-Control-Allow-Origin','*');
// res.setHeader('Access-Control-Allow-Headers',
// 'Origin,X-Requested-With,Content-Type,Accept,Authorization');
// res.setHeader('Access-Control-Allow-Methods','GET,POST,PATCH,DELETE');
// next();
// })
app.use(userRouter);
app.use(dashRouter);
app.use(error);








app.listen(process.env.PORT,()=>{
    console.log(`server is runing at ${process.env.PORT}`);
});