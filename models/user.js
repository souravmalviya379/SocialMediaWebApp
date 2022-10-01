const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    fname: {
        type: String,
        required: true
    },
    lname: {
        type: String,
        required: true
    } 
},
{timestamps: true}          //this will add timestamps like createdAt, updatedAt,etc.
);


const User = mongoose.model('User', userSchema);

module.exports = User;