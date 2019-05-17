
var mongoose = require('mongoose');
const Schema = mongoose.Schema;


var topicComment = new mongoose.Schema({
  commentText:String,
  date_time: {type: Date, default: Date.now},
  comment_id: mongoose.Schema.Types.ObjectId,
})