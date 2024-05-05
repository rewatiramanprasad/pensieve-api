const express=require('express');
const {queryWithPara}=require('../utility/db');
const crypto=require('crypto-js');
const response = require('../utility/response');
const router=express.Router();
const {signupController,loginController}=require('./controller');
const {isValidLogin,isValidSignup}=require('./validation')


router.get('/', (req, res) => {
    res.send('products api running new deploy');
});
router.get('/ping', (req, res) => {
    res.status(200).send('PONG').end();
});
router.post('/signup',isValidSignup,signupController);

router.post('/login',isValidLogin,loginController);



module.exports=router;
