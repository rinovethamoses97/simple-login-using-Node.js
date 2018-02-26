var express = require('express');  
var app = express();  
var cookieParser = require('cookie-parser');  
app.use(cookieParser());  
var bodyParser = require('body-parser');  
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var mysql = require('mysql');
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "login"
});
app.get('/logout', function (req, res) {  
   
   res.clearCookie("user");
   res.end("<script>location='index'</script>");
}) 

app.use(express.static('public'));  

app.get('/cookieget', function (req, res) {  
   
    var a=req.cookies.user;
    var json={
      "name":a
    }
    var obj=JSON.stringify(json);
    res.end(obj);
}) 

app.get('/index', function (req, res) {  
   
    res.sendFile( __dirname + "/" + "index.html" );
}) 

app.get('/main', function (req, res) {  
  var u=req.cookies.user;
  if(u==undefined)
  {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end("<script>alert('PLz login first'); location='index';</script>");
  }
  else
  {
     
     res.sendFile( __dirname + "/" + "main.html" );        
  }
}) 
app.post('/process', urlencodedParser, function (req, res) {  
 var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "login"
});
var x;
var a=req.body.username;
var b=req.body.password;
 con.connect(function(err) {
  if (err) throw err;
  con.query("SELECT * FROM login where username=? and password=?",[a,b], function (err, result, fields) {
    if (err) throw err;
    if(result[0]==undefined)
    {
      
        res.end("<script>alert('login failed');location='index';</script>");
    }
    else
    {
        res.cookie('user',a);      
        res.end("<script>alert('login success');location='main';</script>");
    }
   
  });
});

})  
var server = app.listen(8000, function () {  
  var host = server.address().address  
  var port = server.address().port  
  console.log("Example app listening at http://%s:%s", host, port)  
})  