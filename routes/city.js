var express = require('express');
var router = express.Router();
var DB=require("../databaseConnection")
const Cryptr = require('cryptr');
const cryptr = new Cryptr('myTotallySecretKey');

// genderRoute id, name, description, districtId, code, createdBy, cretedDate
router.get('/', (req, res, next)=>{
    var Query=`Select * from city ORDER BY name`
    DB.query(Query,(err,result)=>{
      if(err){    console.log("errorresponse",err);return JSON.stringify(err);}
      else{
        console.log("data",result);
     result.length>0?res.status(200).json({statuscode:200,message:'Success',data:result}):res.status(200).json({statuscode:300,message:'No Record',data:result})
    }
    })
  });
  router.get('/:id', (req, res, next)=>{
    var Query=`Select * from city where id=${req.params.id}`
    DB.query(Query,(err,result)=>{
      if(err){    res.status(200).json({statuscode:500,message:res})
    
    }
      else{
        result.length>0?res.status(200).json({statuscode:200,message:'Success',data:result}):res.status(200).json({statuscode:300,message:'No Record',data:result})
    }
    })
  });
// id, name, description, districtId, code, createdBy, cretedDate
  router.post('/', (req, res) => {
    var Query = `insert into city(name,description,districtId,code,createdBy,cretedDate) values('${req.body.name}','${req.body.description}',${req.body.districtId},'${req.body.code}',${req.body.createdBy},'${new Date()}')`
    DB.query(Query, (err, result) => {
        if (err) { res.status(200).json({ statuscode: 500, message: err }) }
        else res.status(200).json({ statuscode: 200, message: 'state Created Successfully!' })
    })
  })
  
  router.put('/', (req, res) => {
    console.log("req", req);
   
//id, name, description, stateId, code, createdBy, cretedDate
    var Query = `UPDATE city SET name='${req.body.name}',description='${req.body.description}',districtId='${req.body.districtId}',code='${req.body.code}' WHERE id=${req.body.id}`
    DB.query(Query, (err, result) => {
        if (err) { res.status(200).json({ statuscode: 500, message: err }) }
        else res.status(200).json({ statuscode: 200, message: 'state Updated Successfully!' })
    })
  })


  router.delete('/:id', (req, res) => {
    console.log("req", req.params.roll_Id);
    var Query = `DELETE FROM city WHERE id = ${req.params.id}`
    DB.query(Query, (err, result) => {
        if (err) { console.log("errorresponse", err); return JSON.stringify(err); }
        else res.status(200).json({ statuscode: 200, message: 'State Deleted Successfully!' })
    })
  })
  module.exports = router;