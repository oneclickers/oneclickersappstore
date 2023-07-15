var express = require('express');
var router = express.Router();
var DB=require("../databaseConnection")
const Cryptr = require('cryptr');
const cryptr = new Cryptr('myTotallySecretKey');

// genderRoute
router.get('/', (req, res, next)=>{
    var Query=`Select * from inputFielType`
    DB.query(Query,(err,result)=>{
      if(err){    console.log("errorresponse",err);return JSON.stringify(err);}
      else{
        console.log("data",result);
        res.status(200).json({statuscode:200,message:'Suvdsdccesfwfws',data:result})}
    })
  });
  router.get('/:id', (req, res, next)=>{
    var Query=`Select * from inputFielType where id=${id}`
    DB.query(Query,(err,result)=>{
      if(err){    console.log("errorresponse",err);return JSON.stringify(err);}
      else{
        console.log("data",result);
        res.status(200).json({statuscode:200,message:'success',data:result})}
    })
  });

  router.post('/', (req, res) => {
    console.log("req", req);
    var Query = `insert into inputFielType(name,description,sort,createdBy,cretedDate) values('${req.body.input_type}','${req.body.description}','${req.body.sort}','${req.body.createdBy}','${new Date()}')`
    DB.query(Query, (err, result) => {
        if (err) { console.log("errorresponse", err); return JSON.stringify(err); }
        else res.status(200).json({ statuscode: 200, message: 'Gender Created Successfully!' })
    })
  })
  
  router.put('/', (req, res) => {
    console.log("req", req);
    var Query = `UPDATE gender SET 
    gender_type='${req.body.gender_type}',
    description=${req.body.description},
    WHERE id=${req.body.user_Id}`
    DB.query(Query, (err, result) => {
        if (err) { console.log("errorresponse", err); return JSON.stringify(err); }
        else res.status(200).json({ statuscode: 200, message: 'Gender Details Updated Successfully!' })
    })
  })


  router.delete('/:genderID', (req, res) => {
    console.log("req", req.params.roll_Id);
    var Query = `DELETE FROM gender WHERE id = ${req.params.genderID}`
    DB.query(Query, (err, result) => {
        if (err) { console.log("errorresponse", err); return JSON.stringify(err); }
        else res.status(200).json({ statuscode: 200, message: 'Gender Deleted Successfully!' })
    })
  })
  module.exports = router;