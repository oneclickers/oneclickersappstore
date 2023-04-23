var express = require('express');
var router = express.Router();
var DB=require("../databaseConnection")

/* GET users listing. */
router.get('/', (req, res, next)=>{
    var Query="Select * from userRoll"
    DB.query(Query,(err,result)=>{
      if(err){    console.log("errorresponse",err);return JSON.stringify(err);}
      else res.status(200).json({statuscode:200,message:'Success',data:result})
    })
  });
  
  router.post('/', (req, res) => {
    console.log("req", req);
    var Query = `insert into userRoll(roll_Name,description,created_Date,updated_Date,is_Active) values('${req.body.roll_Name}','${req.body.description}','${req.body.created_Date}','${req.body.updated_Date}',${req.body.is_Active})`
    DB.query(Query, (err, result) => {
        if (err) { console.log("errorresponse", err); return JSON.stringify(err); }
        else res.status(200).json({ statuscode: 200, message: 'User Roll Created Successfully!' })
    })
  })
  router.put('/', (req, res) => {
    console.log("req", req);
    var Query = `UPDATE userRoll SET 
    roll_Name = '${req.body.roll_Name}',
    description='${req.body.description}',
    created_Date='${req.body.created_Date}',
    updated_Date='${req.body.updated_Date}',
    is_Active=${req.body.is_Active} 
    WHERE roll_Id = ${req.body.roll_Id}`
    DB.query(Query, (err, result) => {
        if (err) { console.log("errorresponse", err); return JSON.stringify(err); }
        else res.status(200).json({ statuscode: 200, message: 'User Roll Updated Successfully!' })
    })
  })
  router.delete('/:roll_Id', (req, res) => {
    console.log("req", req.params.roll_Id);
    var Query = `DELETE FROM userRoll WHERE roll_Id = ${req.params.roll_Id}`
    DB.query(Query, (err, result) => {
        if (err) { console.log("errorresponse", err); return JSON.stringify(err); }
        else res.status(200).json({ statuscode: 200, message: 'User Roll Deleted Successfully!' })
    })
  })
  
module.exports = router;