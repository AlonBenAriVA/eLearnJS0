const express = require('express');
const app = express();
var session = require('express-session')
const port = 5000;

const bodyParser = require('body-parser');
app.use(express.static(__dirname + "/"))
app.use(bodyParser.urlencoded({ extended:true}));
app.use(bodyParser.json());
app.use(session({secret:'mysecret',
                resave:false,
                saveUninitialized:false}))



// set up mongodb

var mongoose = require("mongoose");
// mongoose.Promise = global.Promise;

var User  = require('./Schemas/user.js');
var Comment = require('./Schemas/topicComment.js')
var Topic = require('./Schemas/Topic.js')
var Video = require('./Schemas/VideoCollection.js')


mongoose.connect('mongodb://localhost:27017/elearn1',{ useCreateIndex:true, useNewUrlParser: true })
// If the connection throws an error
mongoose.connection.on('error',function (err) {  
  console.log('Mongoose default connection error: ' + err);
}); 
// routes
app.get('/',function(req,res){

  console.log('Hello World')
  res.sendFile(__dirname + "/index.html")
  
});


app.get('/vidList',function(req,res){
  
  Video.find(function(err,data){
    if(err) res.send(err)
    res.send(data)
  });
  
})


app.post('/login', function(req,res){

 User.findOne({networkID:req.body.vhaNetWorkID},function(err,user){
  if (!err){
    if (user!==null){

      if (user.networkID == req.body.vhaNetWorkID &&  user.password1 == req.body.pswd){
        req.session.user_id = user._id // log session user_id
        var loginTime = new Date()
        var loginArray = {
            loginTime : loginTime,
            tzOffset:loginTime.getTimezoneOffset()/24.0,
            fromEpoch:loginTime.valueOf()
        }
       
        user.loginDateTime.push(loginArray)
        user.save(function(err){
          if (!err){
            res.status(200).send({msg:'OK'})
            // res.sendFile(__dirname+"/components/addVideo/addVideo.html")
          } else {
             res.send(err)
          }
        })
       
       
      } else {
        res.send({msg:'mismatched password, try again'})
      }
    } else {
      res.send({msg:'non existant user'})
    }
  } else {
    res.status(500).send(err)
  }
    
 })

})

app.post('/register', function(req,res){
  console.log('req:',req.body)

  User.findOne({networkID:req.body.networkID},{},function(err,data){
    if(!err){
      
      if (data){
        console.log('user already exists')
      } else {
            console.log('registering a new one')
            newUser = User(req.body)
            newUser.save()
              .then(item => {res.status(200).send('success')}). catch (err=>{
              res.status(400).send('unable to save to database')
            })
      }
    } else {
      console.log(err)
    }
  })


  })

app.get('/thread/:vid_id', function(req,res){
  Video.find({_id:JSON.parse(req.params.vid_id)}, function(err,data){
    if (err) res.send(err)
    res.send(data)
  })
})

app.get('/getTopicList', function(req,res){
  Topic.find({},function(err,topicHeadings){
    if (err) res.send(err)
    res.send(topicHeadings)
  })
})


app.post('/newTopic',function(req,res){
  console.log(req.user)
  var topic2Post = req.body
  topic2Post.topicText = {
    commentText:req.body.topicText,
     date_time:Date(),

  }
  var topic = new Topic(topic2Post)
  topic.save(function(err){
    if (err){
      console.log('could not save new')
    } 
    else{
      console.log('saved new topic ok')
    }
    
    Topic.find({},function(err,topicHeadings){
      if (err)  res.send(err)
     
      res.send(topicHeadings)
    });
  })

})

app.get('/showComments/:topic_id',function(req,res){
  
  console.log(req.params)
  Topic.find({_id:JSON.parse(req.params.topic_id)},function(err,commentList){
    if (err) {
      (res.send(err))
    } 
    else
    {
      res.send(commentList)
    }
  })
})

app.post('/reply',function(req,res){
  
  var payload = {
    commentText: req.body.newComment,
    date_time:req.body.date_time
  }
  var updated  = Array(payload)
  console.log('payload',payload)
  Topic.findOne({_id:req.body.topic_id},function(err,commentlist){
    if (err){res.send(err)}
    else
    {
      commentlist.topicText.push(payload)
      commentlist.save(function(err){
        if (err){
          console.log('could not save')
        }
        else{
          res.send(commentlist)
        }
      })

    }
  })
  
})

app.post('/loadClips', function(req,res){
  const vids = [{videoTitle:'dragon.mp4',videoTopic:'Moses et al',topic:[]},
        {videoTitle:'ActiveOrders.mp4', videoTopic:'JamesBond', topic:[{text:'Bye0', date_time : Date.now()}]}]
  vids.forEach(function(v){
    var clip = new Video(v);
    clip.save(function(err){
      if(err) throw (err)
      console.log('saved ok');
    })
  })
});


app.listen(port, () => {
  console.log('Server listening on port:' +port)
})