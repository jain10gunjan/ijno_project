//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _  = require("lodash");
const fs = require('fs');
const config = require("./api/api.json");
'use strict';
const request = require('request');
const serverless = require('serverless-http');

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

let posts = [];

app.get("/", function(req,res){

  res.send('App Running Succesfully');
});

//Achieving dynamic website
//Routing in express.js





app.get("/contact", function(req,res){
  res.render("contact", {contactContent: contactContent});
});

app.get("/about", function(req,res){
  res.render("about", {aboutContent: aboutContent});
});

const url = 'https://jain10gunjan.github.io/ijnoapi/api.json';

request.get({
    url: url,
    json: true,
    headers: {'User-Agent': 'request'}
  }, (err, res, apiData) => {
    if (err) {
      console.log('Error:', err);
    } else if (res.statusCode !== 200) {
      console.log('Status:', res.statusCode);
    } else {
      // data is already parsed as JSON:
    
    const data = apiData.practice;
//Routing and creating dynamic pages

app.get("/practice/:exam/:subjectname/:chaptername/:sheetno", function(req,res){

  //using Lodash for lower case the string
  const requestedExam = _.lowerCase(req.params.exam);
  const requestedSubject = _.lowerCase(req.params.subjectname);
  const requestedChapterName = req.params.chaptername;
  const requestedSheetNo = req.params.sheetno;

  var length = 7,
    except = parseInt(requestedSheetNo.substring(7)),
    posts = Array
        .from({ length }, (_, i) => i+1)
        .filter(n => n !== except);


        //handleClick function
        

 //const storedTitle = _.lowerCase(data[requestedExam][requestedSubject][requestedChapterName][requestedSheetNo]);// using Lodash

 const storedTitle =_.capitalize(requestedExam) + ' ' + _.capitalize(requestedSubject) + ' ' + _.capitalize(requestedChapterName).split('-').join(' ') + ' ' + _.capitalize(requestedSheetNo);
 // using Lodash

 const dynamicStoredTitle = _.capitalize(requestedChapterName).split('-').join(' ') + ' ' + _.capitalize(requestedSheetNo.substring(0, 7));// using Lodash


 const storedLink = (data[requestedExam][requestedSubject][requestedChapterName][requestedSheetNo]).split(' ').join('');// using Lodash


    //console.log(storedTitle.split(' ').join(''));
    res.render("post", 
    {
      dynamicPostTitle: storedTitle,
      //dynamicPostBody: requestedChapterName + ' ' + requestedSheetNo + ' ' + storedTitle.split(' ').join(''),
      dynamicSheetTitle: dynamicStoredTitle,
      examname: requestedExam,
      subjectname: requestedSubject,
      chaptername: requestedChapterName,
      sheetno: 'sheet-0',
      link: storedLink,
      posts: posts
    });


    
        
console.log(except);
console.log(posts);

});

    }
});


app.listen(3000, function() {
  console.log("Server started on port 3000");
});

module.exports.handler = serverless(app);
