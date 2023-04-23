var express = require('express');
var router = express.Router();
var DB=require("../databaseConnection")
const jwt = require('jsonwebtoken');
const Cryptr = require('cryptr');
const cryptr = new Cryptr('myTotallySecretKey');

router.post('/', (req, res) => {
  
    var Query=`Select * from users`
    DB.query(Query, (err, result) => {
      if (err) { console.log("errorresponse", err); return JSON.stringify(err); }
      else {
        var user= result.findIndex((element)=>element.email_Id===req.body.email_Id&&element.password===req.body.password)
        console.log("userInfo",user);
        if(user<=-1) res.status(200).json({statuscode:409,message:'Login Faild'})
        else{
          let data = {
            time: Date(),
            userId: result[user].user_Id,
        }
        var Query1=`Select * from menu`
        DB.query(Query1, (err, menuresult) => {
          if (err) { console.log("errorresponse", err); return JSON.stringify(err); }
          else {
            var menu=[]
            var  childrens=[]
            menuresult.filter((menuInfo)=>{
              var accessIntArray=menuInfo.accessInts.split(",")
              console.log("accessid",accessIntArray,accessIntArray.includes(result[user].roll_Id));
              if(accessIntArray.includes(result[user].roll_Id.toString())){
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
              }
            })
            console.log("menu",menu);
            const token = jwt.sign(data, 'gfg_jwt_secret_key');
            res.status(200).json({ statuscode: 200, message: 'Login Success',token:token,data:menu,userId:result[user].user_Id,username:result[user].email_Id})
          }})
        }
      }
  })
  })

module.exports = router;