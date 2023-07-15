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
    console.log("menu data", req.body);
    var Query = `insert into menu(title,Description,parentInt,icon,link,accessInts,c_usr_id,m_usr_id)values
      ("${req.body.title}","${req.body.describtion}",${null},"${req.body.icon}","${req.body.link}","${req.body.access}",${req.body.c_usr_id},${req.body.c_usr_id});`
    DB.query(Query, (err, result) => {
      if (err) { console.log("errorresponse1", err); return JSON.stringify(err); }
      else {

        var parentInt = result['insertId']
        for (var i = 0; i < req.body.children.length; i++) {
          var Query = `insert into menu(title,Description,parentInt,icon,link,accessInts,c_usr_id,m_usr_id)values
              ("${req.body.children[i]['title']}","${req.body.children[i]['describtion']}",${parentInt},"${req.body.children[i]['icon']}","${req.body.children[i]['link']}","${req.body.children[i]['access']}","${req.body.c_usr_id}","${req.body.c_usr_id}");`
          DB.query(Query, (err, result) => {
            if (err) { console.log("errorresponse2", err); return JSON.stringify(err); }
            else {
                        
            }
          })
        }
        res.status(200).json({ statuscode: 200, message: 'Success' })
      }
    })
  } else {
    var Query = `insert into menu(title,Description,parentInt,icon,link,accessInts,c_usr_id,m_usr_id)values
      ("${req.body.title}","${req.body.describtion}",${null},"${req.body.icon}","${req.body.link}","${req.body.access}",${req.body.c_usr_id},${req.body.c_usr_id});`
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

// router.get('/:menu_Id', (req, res, next) => {
//   console.log("req", req.params.menu_Id);
//   var Query = `Select * from menu where accessInts=${req.params.menu_Id}`
//   DB.query(Query, (err, result) => {
//     if (err) { console.log("errorresponse", err); return JSON.stringify(err); }
//     else {
//       var editMenu=[];
//       var model={}
//       result.forEach((menu)=>{
//         if(parentInt===null){
//           model.id=menu.id;
//           model.title=menu.title;
//           model.describtion=menu.Description;
//           model.icon=menu.icon;
//           model.link=menu.link;
//           model.access=menu.accessInts;
//           model.children=result.filter((childMenu)=>{
//             if(menu.id==childMenu.parentInt){

//               return{
//                 id:childMenu.id,
//                 title:childMenu.title,
//                 describtion:childMenu.Description,
//                 icon:childMenu.icon,
//                 link:childMenu.link,
//                 access:childMenu.accessInts,   
//               }
//             }
//           }) 
//           editMenu.push(model) 
//           console.log("childdata",editMenu);
//         }
//       })
//       // WHERE id = ${req.params.menu_Id}
//       // console.log("editmenu",result);
//       res.status(200).json({ statuscode: 200, message: 'Success', data: editMenu })
//     }
//   })
// });

router.get('/:menu_Id', (req, res, next) => {
  console.log("req", req.params.menu_Id);
  var Query = `Select * from menu where id=${req.params.menu_Id} || parentInt=${req.params.menu_Id} ORDER BY id`
  DB.query(Query, (err, result) => {
    if (err) { console.log("errorresponse", err); return JSON.stringify(err); }
    else {
      var editMenu = [];
      var model = {}
      if (result.length > 1) {
        result.forEach((menu) => {
          if (menu.parentInt === null) {
            model.id = menu.id;
            model.title = menu.title;
            model.describtion = menu.Description;
            model.icon = menu.icon;
            model.link = menu.link;
            model.access = menu.accessInts;
            model.parentInt=menu.parentInt
            model.children = result.filter((childMenu) => {
              if (menu.id == childMenu.parentInt) {

                return {
                  id: childMenu.id,
                  title: childMenu.title,
                  describtion: childMenu.Description,
                  icon: childMenu.icon,
                  link: childMenu.link,
                  parentInt:menu.parentInt,
                  access: childMenu.accessInts,
                }
              }
            })
            editMenu.push(model)
            console.log("childdata", editMenu);
          }

        })
      }
      else {
        result.forEach((menu) => {
          model.id = menu.id;
          model.title = menu.title;
          model.describtion = menu.Description;
          model.icon = menu.icon;
          model.link = menu.link;
          model.access = menu.accessInts;
          model.parentInt=menu.parentInt
          model.children = []
        })
        editMenu.push(model)
      }

      // WHERE id = ${req.params.menu_Id}
      // console.log("editmenu",result);
      res.status(200).json({ statuscode: 200, message: 'Success', data: editMenu })
    }
  })
});

router.put('/', (req, res, next) => {
  console.log("body", req.body);
  if (req.body[0].children.length === 0) {
    req.body.forEach((body) => {
      var Query1 = `update menu set title = '${body.title}',Description='${body.describtion}',icon='${body.icon}',link='${body.link}',parentInt=${body.parentInt},accessInts=${body.access},m_usr_id=${body.m_usr_id} where id = ${body.id}`;
      DB.query(Query1, (err, result) => {
        if (err) { console.log("errorresponse", err); return JSON.stringify(err); }
        else {
          res.status(200).json({ statuscode: 200, message: 'Menu Updated Successfully...!' })
        }

      })
    })
  }
  else {
    console.log("body", req.body);
    req.body.forEach((body) => {
      var Query1 = `update menu set title = '${body.title}',Description='${body.describtion}',icon='${body.icon}',link='${body.link}',parentInt=${body.parentInt},accessInts=${body.access},m_usr_id=${body.m_usr_id} where id = ${body.id}`;
      DB.query(Query1, (err, result) => {
        if (err) { console.log("errorresponse", err); return JSON.stringify(err); }
        else {
          body.children.forEach((childBody,index) => {
            console.log("child data", childBody);
            if (childBody.id === null) {
              var Query2 = `insert into menu(title,Description,parentInt,icon,link,accessInts,c_usr_id,m_usr_id)values
            ("${childBody.title}","${childBody.describtion}",${childBody.parentInt},"${childBody.icon}","${childBody.link}","${childBody.access}",${childBody.c_usr_id},${null});`
              DB.query(Query2, (err, result) => {
                if (err) { console.log("errorresponse", err); return JSON.stringify(err); }
                else { 
                  // res.status(200).json({ statuscode: 200, message: 'Menu Created Successfully' }) 
                }
              })
            }
            else {
              var Query1 = `update menu set title = '${childBody.title}',Description='${childBody.describtion}',icon='${childBody.icon}',link='${childBody.link}',parentInt=${childBody.parentInt},accessInts=${childBody.access},m_usr_id=${childBody.m_usr_id} where id = ${childBody.id}`;
              DB.query(Query1, (err, result) => {
                if (err) { console.log("errorresponse", err); return JSON.stringify(err); }
                else {
                  // res.status(200).json({ statuscode: 200, message: 'Menu Updated Successfully...!' })
                }

              })
            }




          })
          res.status(200).json({ statuscode: 200, message: 'Menu Updated Successfully...!' })
        }

      })
    })
  }
});
module.exports = router;