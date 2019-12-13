var express = require('express');
var mysql = require('mysql');
var bodyParser = require('body-parser');
var app = express();
var http = require('http');
var dbconfig = require('./config/dbconfig');
var cors = require('cors');
app.use(cors({ maxAge: 600 }));
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'POST, GET, DELETE, PUT');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    if ('OPTIONS' == req.method) {
      res.sendStatus(200);
    } else {
      next();
    }
  });
  
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true}));

var con = mysql.createConnection({
    host: dbconfig.dbhost
});

con.connect(function(err){
    if(err){
        console.log('error connection:' + err);
        return;
    }
    console.log('connection ready');
});
con.end(function(err){ });

/********api */
var api = require('./controller/api');

app.get('/getdata', api.getdata);
app.post('/adddata', api.adddata); 
app.delete('/deletedata/:id', api.deletedata);
app.put('/updatedata/:id', api.updatedata); 

var port = 2121;

http.createServer(app).listen(port, function(){
    console.log('port is:' + port);
});