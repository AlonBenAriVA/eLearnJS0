"use strict";
/*
 *  Defined the Mongoose Schema and return a Model for a User
 */
/* jshint node: true */

var mongoose = require('mongoose');
const Schema = mongoose.Schema;

// var topicSchema = new mongoose.Schema({
//   text: String,     // The text of the comment.
//   date_time: {type: Date, default: Date.now}, // The date and time when the comment was created.
//   // user_id: mongoose.Schema.Types.ObjectId,    // 	The ID of the user who created the comment.
// });
//  var Topic = mongoose.model('Topic',topicSchema)

//  module.exports = Topic


// create a schema for the video
var videoSchema = new mongoose.Schema({
    videoTitle: String, // First name of the user.
    videoTopic: String,  // Last name of the user.
    // topic : [topicSchema]
})
var Vids = mongoose.model('Video', videoSchema);

// make this available to our users in our Node applications
module.exports = Vids ;
