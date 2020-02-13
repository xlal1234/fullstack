var express = require('express')
var app = express()
var restRouter = require("./routes/rest")
var indexRouter = require("./routes/index");
var path = require("path");
var mongoose = require('mongoose');
var https = require('https'); 
var fs = require('fs'); 
var privateKey = fs.readFileSync(path.join(__dirname, './certificate/private.pem'), 'utf8'); 
var certificate = fs.readFileSync(path.join(__dirname, './certificate/file.crt'), 'utf8'); 
var credentials = {key: privateKey, cert: certificate}; 
var httpsServer = https.createServer(credentials, app); 
//var ProblemModel = require("./dao/problemModel");
const port = '3000'
const db_str = "mongodb://127.0.0.1/pbmset";

app.use(express.static(path.join(__dirname, '../public')));
app.use("/api/v1", restRouter ); 
app.use('/', indexRouter);
mongoose.connect(db_str);
//ProblemModel.find().then( (result) => {console.log(result)} );

httpsServer.listen( port, function() {
    console.log(`server running at port ${port}/`)
})