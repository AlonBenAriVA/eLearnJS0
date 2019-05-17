
var mongoose = require('mongoose');
const Schema = mongoose.Schema;




var topicComment = require('./topicComment.js')

var topicSchema = new mongoose.Schema({
  topic_id:mongoose.Schema.Types.ObjectId,
  vid_id: String, //  show me do video id.
  newTopic: String,     // The text of the comment.
  date_time: {type: Date, default: Date.now}, // The date and time when the comment was created.
  topicText: [topicComment] // topic comment schema
  
});
 var Topic = mongoose.model('Topic',topicSchema)

 module.exports = Topic
