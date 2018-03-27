var bodyParser = require('body-parser');
var mongoose = require('mongoose');

mongoose.connect(<Path to database>);

var channelSchema = new mongoose.Schema({
  name: String,
  count: Number,
  list: Array
});

var Channel = mongoose.model('Channel',channelSchema);

var urlencodedParser = bodyParser.urlencoded({extended: false});

module.exports = function(app){

  app.use(urlencodedParser);
  app.use(bodyParser.json());

  app.get('/',function(req, res){
    //get the data from =mongo db and pass it on
    Channel.find({},function(err, data){
        if(err) throw err;
        res.json(data);
    });
  });

  app.post('/channel', function(req, res){
    //get the new channel from the request and save it in mongodb
    Channel.find({},function(err, data){
      if(err){
        throw err;
      }
      else {
        var newChannel = Channel(req.body).save(function(err, data){
          if(err) throw err;
          res.json(data);
        });
      }
    });
  });

  app.post('/url',function(req, res){
    var value;
    Channel.findOneAndUpdate({name: req.body.channel}, {$push: {list: {url: req.body.url, text: req.body.text}}}, function(err, doc){
        if(err) throw err;
        value = doc.count + 1;
        Channel.findOneAndUpdate({name: req.body.channel}, {$set: {count: value}}, function(err, doc){
          if(err) throw err;
          res.json(doc);
        });
    });

  });

  app.delete('/url',function(req, res){
    //console.log(req.body);
    Channel.findOneAndUpdate({name: req.body.name}, {$pull: {list : {url: req.body.url }}},function(err, doc){
      if(err) throw err;
      //console.log(doc.count);
      var value = doc.count - 1;
      Channel.findOneAndUpdate({name: req.body.name}, {$set: {count : value }},function(err, doc){
        if(err) throw err;
        //console.log(doc.count);
        res.json(doc);
      });
    });
  });
};
