const csv = require('csv-parser');
const fs = require('fs');
const express = require('express');
const app=express();
app.use(express.json());       
app.use(express.urlencoded({extended: true}));
const result =[];
app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/index.html');
});
app.post('/filter',(req,res)=>{
    fs.createReadStream('data.csv').pipe(csv()).on('data',(data)=>{
        result.push(data);
    }).on('end',()=>{
        for(let i=0;i<result.length;i++){
            if(Number(result[i].Score)<=Number(req.body.Score) && req.body.State==result[i].State){
                res.write(result[i].InstituteName+"  "+ result[i].Score+"\n");
            }
        }
        res.end();
    });
});
app.listen(3000,()=>{
    console.log('listening');
});