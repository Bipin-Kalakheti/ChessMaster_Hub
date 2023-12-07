//require modudules for the model
let mongoose = require('mongoose');
let passportLocalMongoose = require('passport-local-mongoose');

let User = mongoose.Schema(
    {
        username:
        {
            type: String,
            default: "",
            trim: true,
            required: 'username is required'
        },
        password:
        {
            type: String,
            deafult: "",
            trim: true,
            required: 'password is required'
        },
        email:
        {
            type: String,
            deafult: "",
            trim: true,
            required: 'email is required'
        },
        created:
        {
            type: Date,
            default: Date.now
        },
        updated:
        {
            type: Date,
            default: Date.now
        }
    },
    {
        collection: "users"
    }
);

//Configuration
let options = ({missingPasswordError: 'Wrong Password'});

User.plugin(passportLocalMongoose, options);

module.exports.User = mongoose.model('User', User);