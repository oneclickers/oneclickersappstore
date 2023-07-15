var express = require('express');
var email = require('nodemailer');
var router = express.Router();
var DB=require("../databaseConnection")
const Cryptr = require('cryptr');
const cryptr = new Cryptr('myTotallySecretKey');

router.get('/', (req, res, next)=>{
    var Query=`Select * from gender`
    DB.query(Query,(err,result)=>{
      if(err){    console.log("errorresponse",err);return JSON.stringify(err);}
      else{
        console.log("data",result);
        res.status(200).json({statuscode:200,message:'Suvdsdccesfwfws',data:result})}
    })
  });
  router.get('/:id', (req, res, next)=>{
    var Query=`Select * from gender where id=${id}`
    DB.query(Query,(err,result)=>{
      if(err){    console.log("errorresponse",err);return JSON.stringify(err);}
      else{
        console.log("data",result);
        res.status(200).json({statuscode:200,message:'success',data:result})}
    })
  });

  router.post('/', (req, res) => {
    var sender=email.createTransport({
        service:'gmail',
        auth:{
            user:req.body.from,
            pass:req.body.password
        }
    });

    var composemail={
        from:req.body.from,
        to:req.body.to,
        subject:req.body.subject,
        text:req.body.body
    };
    sender.sendMail(composemail,(err,result)=>{
        if(err){
            console.log("error",err);
        }
        else{
            var Query = `insert into email(senderId,receiverId,emailFrom,emailTo,cc,bcc,subject,body) values(${req.body.senderId},${req.body.receiverId},'${req.body.from}','${req.body.to}','${req.body.cc}','${req.body.bcc}','${req.body.subject}','${req.body.body}')`
            DB.query(Query, (err, result) => {
                if (err) { console.log("errorresponse", err); return JSON.stringify(err); }
                else res.status(200).json({ statuscode: 200, message: 'Email Sended Successfully!' })
            }) 
        }
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