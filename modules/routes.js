var express = require('express');
var router = express.Router();
var path = require('path');




var mongoose = require('mongoose');
mongoose.connect('localhost:27017/userVillans');

var villanSchema = new  mongoose.Schema({
  alias: String,
  first_name: String,
  last_name: String,
  city: String,
  power_name: String
});

var powerSchema = new mongoose.Schema({
  power_name: Array
});

var powerlists = mongoose.model('powerlists', powerSchema);
var villans = mongoose.model( 'villans', villanSchema );

router.get('/', function(req, res){
  console.log("Going Home");
  res.sendFile(path.resolve('views/index.html'));
});

router.get('/getPowers', function(req, res){
  console.log("Grabbing Powers");
  powerlists.find().then(function(data){
    res.send(data);
  })
});

router.get('/getVillans', function(req, res){
  console.log("Getting Villans");
  villans.find().then(function(data){
    res.send(data);
  });
});

router.post('/createVillan', function(req, res){
  var newVillan = {
    alias: req.body.alias,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    city: req.body.city,
    power_name: req.body.power_name
  }
  console.log(newVillan);
  var newRecord = villans(newVillan);
  newRecord.save();

  res.send("Done");
});

router.delete('/deleteVillan', function(req, res){
  console.log("deleting: " + req.body.id);
  villans.findByIdAndRemove(req.body.id, function(err){
    if(err){
      res.sendStatus(500);
    } else {
      res.sendStatus(200);
    }
  });
});


module.exports = router;
