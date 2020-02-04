var express = require("express");
var app = express();
var bp = require("body-parser");
var fs = require('fs');

app.use(bp.urlencoded({extended:true}));
app.use(express.static("public"));
app.set("view engine","ejs");
var helpers = [];
var d = new Date();

app.get("/map.html", function(req,res){
  var filtered = helpers.filter(function(value, index, arr){
    var data =  value[6].split(":");
    var hours = data[0];
    hours = (hours.slice(0, hours.length));
    var mins = (data[1]);
    if(hours>d.getHours()){
      return true;
    }
    else if(hours==d.getHours() && mins>d.getMinutes()){
      return true;
    }
    else{
      return false;
    }
  });
    res.render("map", {helpers:filtered});
});

app.get("/sign_up.html", function(req,res){
  res.render("sign_up");
});

app.get("/", function(req,res){
  res.render("info");
});

app.get("/info.html", function(req,res){
  res.render("info");
});

app.post("/sign_up", function(req,res){
  var name = req.body.name;
  var email = req.body.email;
  var location = req.body.location;
  var lat =  location.split(",")[0];
  lat = lat.slice(0, lat.length);
  var long =  location.split(",")[1];
  var quals = req.body.qual;
  var additional_comments = req.body.add;
  var time = req.body.time;
  var date= req.body.date;
  var helper = [name, email,long,lat,quals,additional_comments,time,date];
  helpers.push(helper);
  res.redirect("/map.html");
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Our app is running on port ${ PORT }`);
});
