var express = require('express');
var router = express.Router();
var DB = require("../databaseConnection")
/* GET users listing. */
router.post('/', (req, res) => {
    console.log("req", req);
    var Query = `insert into register(name,age,districts_Names,cities_Names) values('${req.body.username}',${req.body.age},'${req.body.district}','${req.body.city}')`
    DB.query(Query, (err, result) => {
        if (err) { console.log("errorresponse", err); return JSON.stringify(err); }
        else res.status(200).json({ statuscode: 200, message: 'User Account Created Successfully' })
    })
})
router.put('/', (req, res) => {
    console.log("req", req);
    var Query = `UPDATE register SET 
    name = '${req.body.username}',
    age=${req.body.age},
    districts_Names='${req.body.district}',
    cities_Names='${req.body.city}'
    WHERE userid = ${req.body.userid}
     `
    DB.query(Query, (err, result) => {
        if (err) { console.log("errorresponse", err); return JSON.stringify(err); }
        else res.status(200).json({ statuscode: 200, message: 'User Details Updated Successfully!' })
    })
})
router.delete('/:userId', (req, res) => {
    console.log("req", req.params.userId);
    var Query = `DELETE FROM register WHERE userid = ${req.params.userId}`
    DB.query(Query, (err, result) => {
        if (err) { console.log("errorresponse", err); return JSON.stringify(err); }
        else res.status(200).json({ statuscode: 200, message: 'User Deleted Successfully!' })
    })
})

module.exports = router;
