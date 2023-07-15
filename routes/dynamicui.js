var express = require('express');
var router = express.Router();
var DB=require("../databaseConnection")

/* GET users listing. */
router.get('/', (req, res, next)=>{
    var Query="Select * from userinterface"
    DB.query(Query,(err,result)=>{
      if(err){    console.log("errorresponse",err);return JSON.stringify(err);}
      else res.status(200).json({statuscode:200,message:'Success',data:result})
    })
  });
  
  router.post('/', (req, res) => {
    console.log("req", req);
    var Query = `insert into userinterface(
        label,
        FielType,
        FielDateType,
        formcotrolname,
        mandatory,
        width,
        sort,
        code,
        createdBy,
        cretedDate,
        title,
        uicode,
        Visible) values(
            '${req.body.label}','${req.body.FielType}','${req.body.FielDateType}','${req.body.formcotrolname}','${req.body.mandatory}','${req.body.width}','${req.body.sort}','${req.body.code}','${req.body.createdBy}','${new Date()}','${req.body.title}' , '${req.body.uicode}','${req.body.Visible}')`
    DB.query(Query, (err, result) => {
        if (err) { console.log("errorresponse", err); return JSON.stringify(err); }
        else res.status(200).json({ statuscode: 200, message: 'Ui Created Successfully!' })
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