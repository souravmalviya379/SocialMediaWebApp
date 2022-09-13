const express = require('express');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');

app.use(express.static('./assets'));
app.use(expressLayouts);



//use express router
app.use('/', require('./routes'))

//setting up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');

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