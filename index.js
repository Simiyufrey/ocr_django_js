import express from "express";
import bodyParser from "body-parser";
import connection from './db.js'
const app=express()

app.use(bodyParser.json())

const PORT=3000
if(connection){
    
}
let movies=[]


app.get("/",(req,res)=>{

    connection.execute("select * from Movies;",(err,result)=>{
        if(err){
          console.log(err)
        }
        else{
          res.json(result)
        }
      })

})



app.listen(PORT,()=>{
    console.log(`app started  to http://localhost:${PORT}`)
})


