const express = require("express");
const dasRouter = express.Router();
const {detailController,summaryController}=require('./controller');
const {isValidDetails}=require('./validation')
dasRouter.get("/gps/summary",summaryController);

dasRouter.get('/gps/details',isValidDetails,detailController)

module.exports = dasRouter;
