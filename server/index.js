
const express = require("express");
const server = express();

const PORT = process.env.PORT || 3000;

server.use(express.static(__dirname+'/../public'));


server.listen(PORT,()=>{
    console.log(`the server is running on port ${PORT}`)
});
