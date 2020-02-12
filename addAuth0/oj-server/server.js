var express = require('express')
var app = express()
var restRouter = require("./routes/rest")
var indexRouter = require("./routes/index");
var path = require("path");
var mongoose = require('mongoose');
//var ProblemModel = require("./dao/problemModel");
const port = '3000'
const db_str = "mongodb://127.0.0.1/pbmset";

app.use(express.static(path.join(__dirname, '../public')));
app.use('/', indexRouter);
app.use("/api/v1", restRouter ); 
mongoose.connect(db_str);
//ProblemModel.find().then( (result) => {console.log(result)} );

app.listen( port, function() {
    console.log(`server running at port ${port}/`)
})