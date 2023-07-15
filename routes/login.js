var express = require('express');
var router = express.Router();
var DB=require("../databaseConnection")
const jwt = require('jsonwebtoken');
const Cryptr = require('cryptr');
const cryptr = new Cryptr('myTotallySecretKey');

router.post('/', (req, res) => {
  
    var Query=`Select * from users where email_Id="${req.body.email_Id}" && password="${req.body.password}"`
    DB.query(Query, (err, result) => {
      if (err) { console.log("errorresponse", err); return JSON.stringify(err); }
      else {
          if (err) {console.log("errorresponse", err); return JSON.stringify(err); }
        else if(result.length<=0) res.status(200).json({statuscode:409,message:'Login Faild'})
        else{
          let data = {
            time: Date(),
            userId: result[0].user_Id,
        }
        var Query1=`select * from menu where accessInts= ${result[0]['roll_Id']} order by short ASC;`
        DB.query(Query1, (err, menuresult) => {
          if (err) {console.log("errorresponse", err); return JSON.stringify(err); }
          else {
            var menu=[]
            var  childrens=[]
            menuresult.filter((menuInfo)=>{
                  if(menuInfo.parentInt===null){
                    menuresult.filter((child)=>{
                      if(child.parentInt==menuInfo.id){
                        childrens.push({
                          title:child.title,
                          icon:child.icon,
                          link:child.link,
                        })
                      }
                    })
                    if(childrens.length>0){
                      menu.push({
                        title:menuInfo.title,
                        icon:menuInfo.icon,
                        link:menuInfo.link,
                        children:childrens
                      })
                      childrens=[]
                    }
                    else{
                      menu.push({
                        title:menuInfo.title,
                        icon:menuInfo.icon,
                        link:menuInfo.link,
                      })
                    }
                  }
              
            })
            const token = jwt.sign(data, 'gfg_jwt_secret_key');
            res.status(200).json({ statuscode: 200, message: 'Login Success',token:token,data:menu,userId:result[0].user_Id,username:result[0].email_Id,picture:result[0].photo,name:result[0].name})
          }})
        }
      }
  })
  })

module.exports = router;