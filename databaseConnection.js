const DBConnection=require('mysql2');

const DB=DBConnection.createConnection({
    host: "localhost",
    user:'root',
    password:'Selvam55@',
    port:3306,
    database:'one_Click_To_Get',
})

DB.connect((err,res)=>{
    if(err) console.log("error when connection",err);
    else console.log('Database Connected Successfully....*');
})

module.exports=DB