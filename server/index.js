
require("dotenv").config();
const express = require("express");
const {connectToMongodb} = require("./database");
const path = require("path");
const app = express();
app.use(express.json());

app.use(express.static(path.join(__dirname,"build")));
app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname,"build/index.html"));
})



const router = require('./routes');
app.use("/api",router);

const port = process.env.PORT || 4000;

async function startServer(){
    await connectToMongodb();
    app.listen(port,()=>{
        console.log(`server is listening on http://localhost:${port}`);
    });
};
startServer();