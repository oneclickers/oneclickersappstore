var express = require('express');
var router = express.Router();
var DB=require("../databaseConnection")
const Cryptr = require('cryptr');
const cryptr = new Cryptr('myTotallySecretKey');
/* GET users listing. */
router.get('/', (req, res, next)=>{
  var Query="Select * from users"
  DB.query(Query,(err,result)=>{
    if(err){    console.log("errorresponse",err);return JSON.stringify(err);}
    else res.status(200).json({statuscode:200,message:'Success',data:result})
  })
});

router.get('/:user_Id', (req, res, next)=>{
  var Query=`Select * from users  WHERE user_Id=${req.params.user_Id}`
  DB.query(Query,(err,result)=>{
    if(err){    console.log("errorresponse",err);return JSON.stringify(err);}
    else res.status(200).json({statuscode:200,message:'Success',data:result})
  })
});

router.post('/', (req, res) => {
  console.log("req", req);
  var Query=`Select * from users`
  DB.query(Query, (err, result) => {
    if (err) { console.log("errorresponse", err); return JSON.stringify(err); }
    else {
     var data=result.findIndex((object)=>object.email_Id===req.body.email_Id);
      if(data>-1){
        res.status(200).json({statuscode:409,message:'User Already Exists',})
      }
      else{
        var Query = `insert into users(name,roll_Id,email_Id,password,photo,state,district,city,dateofbirth,phonenumber,twitter,facebook,linkedIn,instagram)values('${req.body.name}',${req.body.roll_Id},'${req.body.email_Id}','${cryptr.encrypt(req.body.password)}','${req.body.photo}','${req.body.state}','${req.body.district}','${req.body.city}','${req.body.dateofbirth}','${req.body.phonenumber}','${req.body.twitter}','${req.body.facebook}','${req.body.linkedIn}','${req.body.instagram}')`
        DB.query(Query, (err, result) => {
          if (err) { console.log("errorresponse", err); return JSON.stringify(err); }
          else res.status(200).json({ statuscode: 200, message: 'User Account Created Successfully',token:'' })
      })
      }
    }
})
})

router.put('/', (req, res) => {
  console.log("req", req);

  var Query = `UPDATE users SET 
 
  name='${req.body.name}',
  roll_Id=${req.body.roll_Id},
  email_Id='${req.body.email_Id}',
  password='${req.body.password}',
  photo='${req.body.photo}',
  state='${req.body.state}',
  district='${req.body.district}',
  city='${req.body.city}',
  dateofbirth='${req.body.dateofbirth}',
  phonenumber='${req.body.phonenumber}',
  twitter='${req.body.twitter}',
  facebook='${req.body.facebook}',
  linkedIn='${req.body.linkedIn}',
  instagram='${req.body.instagram}'
  WHERE user_Id=${req.body.user_Id}`
  DB.query(Query, (err, result) => {
      if (err) { console.log("errorresponse", err); return JSON.stringify(err); }
      else res.status(200).json({ statuscode: 200, message: 'User Details Updated Successfully!' })
  })
})

router.delete('/:user_Id', (req, res) => {
  console.log("req", req.params.userId);
  var Query = `DELETE FROM users WHERE user_Id = ${req.params.user_Id}`
  DB.query(Query, (err, result) => {
      if (err) { console.log("errorresponse", err); return JSON.stringify(err); }
      else res.status(200).json({ statuscode: 200, message: 'User Deleted Successfully!' })
  })
})

// genderRoute
router.get('/gender', (req, res, next)=>{
  var Query=`Select * from gender`
  DB.query(Query,(err,result)=>{
    if(err){    console.log("errorresponse",err);return JSON.stringify(err);}
    else res.status(200).json({statuscode:200,message:'Succesfwfws',data:result})
  })
});
module.exports = router;
