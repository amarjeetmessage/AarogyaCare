<<<<<<< HEAD
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
=======
const app = require("./src/app");
const { connectDatabase, port } = require("./src/config");

async function start() {
  await connectDatabase();
  app.listen(port, () => console.log(`AarogyaCare API listening on ${port}`));
}

if (require.main === module) {
  start().catch((error) => { console.error("Database connection failed", error.message); process.exit(1); });
}

module.exports = app;
>>>>>>> e6c3a6ba2f47ec74061ed3ca7217615339a27290
