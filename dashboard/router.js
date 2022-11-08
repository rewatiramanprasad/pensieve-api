const express = require("express");
const dasRouter = express.Router();
const {detailController,summaryController,hello}=require('./controller');
const {isValidDetails}=require('./validation')
dasRouter.get("/gps/summary",summaryController);

dasRouter.get('/gps/details',isValidDetails,detailController);
dasRouter.get('/gps/hello',hello);


module.exports = dasRouter;
