let express = require('express');
let router = express.Router();

let mongoose = require('mongoose');
let passport = require('passport');

//User model instance
let userModel = require('../models/user');
let User = userModel.User;

//Login
module.exports.displayLoginPage = (req, res, next) =>{
    if(!req.user){
        res.render('login',{
            title: "Login",
            messages: req.flash('loginMessage')
        })
    }
    else{
        return res.redirect('/login');
    }
}
//Login process
module.exports.processLoginPage = function(req, res, next) {
    console.log("process");
    console.log(req.body);

    passport.authenticate('local',
    (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            req.flash('loginMessage', 'Authentication Error');
            console.log("not a user!");
            return res.redirect('/login');
        }
        req.login(user, (err) => {
            //server issue
            if (err) {
                return next(err);
            }
            return res.redirect('/tournament/tournament-edit');
        })
    })(req, res, next);

}
//Register
module.exports.displayRegisterPage = (req, res, next) => {
if (!req.user) {
    res.render('register',
        {
            title: 'register',
            message: req.flash('registerMessage')
        });
}
else {
    return res.redirect('/');
}

}

//Post Register
module.exports.processRegisterPage = (req, res, next) => {
    //instance of register page
    console.log(req.body);
    console.log("register");
    let newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    });

    User.register(newUser, req.body.password, function(err,user) {
        let password = req.body.password;
        console.log(password);
        console.log(req.body);
        if(err){
            console.log("Error with user", err);
            if(err.name == "UserExistsError"){
                req.flash(
                    'registerMessage',
                    'Registration Error: Already exists!'
                );
                console.log("error - User exists");
            }
            return res.render('register',{
                title: 'Register',
                message: req.flash('registerMessage')
            });
        }
        else{
            //no error so redirect for authentication

            return passport.authenticate('local')(req, res, () => {
                //console.log("hello!");
                res.redirect('/tournament/tournament-edit');
            });
        }
    })
}


//Logout
module.exports.performLogout = (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        res.redirect('/home');
    });
};