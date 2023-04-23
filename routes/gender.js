var express = require('express');
var router = express.Router();
var DB=require("../databaseConnection")
const Cryptr = require('cryptr');
const cryptr = new Cryptr('myTotallySecretKey');

// genderRoute
router.get('/', (req, res, next)=>{
    var Query=`Select * from gender`
    DB.query(Query,(err,result)=>{
      if(err){    console.log("errorresponse",err);return JSON.stringify(err);}
      else{
        console.log("data",result);
        res.status(200).json({statuscode:200,message:'Suvdsdccesfwfws',data:result})}
    })
  });
  module.exports = router;