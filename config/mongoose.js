const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/socialApp_development');

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Error Connecting to MongoDB'));

db.once('open', function(){
    console.log('Connected to Database :: MongoDB');
})

module.exports = db;