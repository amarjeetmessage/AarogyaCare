const express =require('express');
const app =express();
const { loadEnvFile } = require('node:process');

loadEnvFile();
app.use(express.json());

const port=process.env.PORT;

app.get('/',(req,res)=>{
    res.send("hello world")
})

app.listen(port,()=>{
    console.log(`Listening at the port: ${port}`)
})