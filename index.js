const express = require('express');
const app = express();
const port = 8000;

app.get('/', (req, res)=>{
    res.send("<h1>Welcome to Express Application</h1>")
})

app.listen(port, (err)=>{
    if(err){
        console.log('Cannot start server');
    }else{
        console.log('Server running at port : ', port);
    }
})