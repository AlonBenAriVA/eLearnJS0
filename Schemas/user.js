"use strict";
/*
 *  Defined the Mongoose Schema and return a Model for a User
 */
/* jshint node: true */

var mongoose = require('mongoose');
var loginDateTimeSchema = new mongoose.Schema({
    loginDateTIme : {type:Date,default:null}
})
var favoriteSchema = new mongoose.Schema({
    file_name:String,
    photo_id:String,
    _id:mongoose.Schema.Types.ObjectId

})
var loginDateTimeSchema = new mongoose.Schema({
        loginTime:Date,
        tzOffset:Number,
        fromEpoch:Number
})
// create a schema
var userSchema = new mongoose.Schema({
    new: {type:Date,default:null},
    firstName: String, // First name of the user.
    lastName: String,  // Last name of the user.
    email:String,   // VA email
    networkID: {type:String, unique:true},    // ie. vhapugbena
    title: String,  // title
    visn: String,    // user visn
    password1: String, // password for user to be 
    password0: String, // password for user to be 
    location:String, // 
    // login_date_time: {type: Date, default: null},
    // logout_date_time: {type: Date, default:null},
    // registered_date_time: {type: Date, default: Date.now},
    // posted_photo_date_time: {type:Date, default:null},
    // recent_comment_date_time:{type:Date, default: null},
    favorites:[favoriteSchema],
    loginDateTime:[loginDateTimeSchema]
    
});

// the schema is useless so far
// we need to create a model using it
var User = mongoose.model('User', userSchema);

// make this available to our users in our Node applications
module.exports = User;
