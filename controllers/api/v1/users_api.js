const User = require('../../../models/user');
const jwt = require('jsonwebtoken');
const env = require('../../../config/environment');

module.exports.createSession = async function(req, res){
    try {
        let email = req.body.email;
        let password = req.body.password;
        let user = await User.findOne({email: email});

        if(!user || user.password != password){
            return res.status(422).json({
                message: 'Invalid username or password'
            })
        }
        return res.status(200).json({
            message: 'Sign in successful, here is your token, please keep it safe !',
            data: { 
                token: jwt.sign(user.toJSON(), env.jwt_secret, {expiresIn: 500000})
                //second argument is encryption key, in third argument time in milliseconds
            }
        })
    
    } catch (err) {
        console.log('Error **** ', err);
        return res.json(500, {
            message: 'Internal server error'
        });
    }
}