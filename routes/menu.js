var express = require('express');
var router = express.Router();
var DB = require("../databaseConnection");

router.get('/', (req, res, next) => {
  var Query = `Select * from menu`
  DB.query(Query, (err, result) => {
    if (err) { console.log("errorresponse", err); return JSON.stringify(err); }
    else res.status(200).json({ statuscode: 200, message: 'Success', data: result })
  })
});

router.post('/', (req, res, next) => {
  if (req.body.children.length > 0) {
    var Query = `insert into menu(title,Description,parentInt,icon,link,accessInts,c_usr_id,m_usr_id)values
      ("${req.body.title}","${req.body.describtion}",null,"${req.body.icon}","${req.body.link}","${req.body.access}",${req.body.c_usr_id},${req.body.m_usr_id});`
    DB.query(Query, (err, result) => {
      if (err) { console.log("errorresponse", err); return JSON.stringify(err); }
      else {
        var Query1 = `SELECT * FROM menu`
        DB.query(Query1, (err, menuResult) => {
          if (err) { console.log("errorresponse", err); return JSON.stringify(err); }
          else {
            var parentInt = menuResult[menuResult.length - 1]['id']
            for (var i = 0; i < req.body.children.length; i++) {
              var Query = `insert into menu(title,Description,parentInt,icon,link,accessInts,c_usr_id,m_usr_id)values
              ("${req.body.children[i]['title']}","${req.body.children[i]['describtion']}",${parentInt},"${req.body.children[i]['icon']}","${req.body.children[i]['link']}","${req.body.children[i]['access']}",${req.body.c_usr_id},${req.body.m_usr_id});`
              DB.query(Query, (err, result) => {
                if (err) { console.log("errorresponse", err); return JSON.stringify(err); }
                else {
                  res.status(200).json({ statuscode: 200, message: 'Success' })
                }
              })
            }
          }
        })
      }
    })
  } else {
    var Query = `insert into menu(title,Description,parentInt,icon,link,accessInts,c_usr_id,m_usr_id)values
      ("${req.body.title}","${req.body.description}",null,"${req.body.icon}","${req.body.link}","${req.body.access}",${req.body.c_usr_id},${req.body.m_usr_id});`
    DB.query(Query, (err, result) => {
      if (err) { console.log("errorresponse", err); return JSON.stringify(err); }
      else res.status(200).json({ statuscode: 200, message: 'Success' })
    })
  }
});

router.delete('/:menu_Id', (req, res) => {
  console.log("req", req.params.menu_Id);
  var Query = `DELETE FROM menu WHERE id = ${req.params.menu_Id}`
  DB.query(Query, (err, result) => {
      if (err) { console.log("errorresponse", err); return JSON.stringify(err); }
      else res.status(200).json({ statuscode: 200, message: 'Menu Deleted Successfully!' })
  })
})

router.get('/:menu_Id', (req, res, next) => {
  console.log("req", req.params.menu_Id);
  var Query = `Select * from menu`
  DB.query(Query, (err, result) => {
    if (err) { console.log("errorresponse", err); return JSON.stringify(err); }
    else {
      var editMenu=[];
      var model={}
      result.forEach((menu)=>{
        if(menu.id==req.params.menu_Id){
          model.id=menu.id;
          model.title=menu.title;
          model.describtion=menu.Description;
          model.icon=menu.icon;
          model.link=menu.link;
          model.access=menu.accessInts;
          model.children=result.filter((childMenu)=>{
            if(menu.id==childMenu.parentInt){
              
              return{
                id:childMenu.id,
                title:childMenu.title,
                describtion:childMenu.Description,
                icon:childMenu.icon,
                link:childMenu.link,
                access:childMenu.accessInts,   
              }
            }
          }) 
          editMenu.push(model) 
          console.log("childdata",editMenu);
        }
      })
      // WHERE id = ${req.params.menu_Id}
      // console.log("editmenu",result);
      res.status(200).json({ statuscode: 200, message: 'Success', data: editMenu })
    }
  })
});

router.put('/', (req, res, next) => {
  console.log("req", req.params.id);
  var Query = `UPDATE menu SET 
  title = '${req.body.title}',
  Description='${req.body.describtion}',
  icon='${req.body.icon}',
  link='${req.body.link}',
  parentInt=${null}
  accessInts=${req.body.access}, 
  c_usr_id=${req.body.m_usr_id}, 
  m_usr_id=${req.body.m_usr_id}, 
  WHERE id = ${req.body.id}`
  DB.query(Query, (err, result) => {
    if (err) { console.log("errorresponse", err); return JSON.stringify(err); }
    else{
      if(req.body.children.length>0){
       for(var i=0;i>req.body.children.length;i++){
        var Query1 = `UPDATE menu SET 
        title = '${req.body.children[i].title}',
        Description='${req.body.children[i].describtion}',
        icon='${req.body.children[i].icon}',
        link='${req.body.children[i].link}',
        parentInt=${req.body.id}
        accessInts=${req.body.children[i].access},
        c_usr_id=${req.body.m_usr_id},
        m_usr_id=${req.body.m_usr_id},
        WHERE id = ${req.body.children[i].id}`
        DB.query(Query1, (err, result) => {
          if (err) { console.log("errorresponse", err); return JSON.stringify(err); }
          else{
            if(children.length===i){
              res.status(200).json({ statuscode: 200, message: 'Menu Updated Successfully...!' })
            }
          }
        })
       }
      }
      else{
        res.status(200).json({ statuscode: 200, message: 'Menu Updated Successfully...!' })
      }
    }
  })
});
module.exports = router;