var express = require('express')
var app = express()
var restRouter = require("./routes/rest")
//var ProblemModel = require("./dao/problemModel");
const port = '3000'
const db_str = "mongodb://127.0.0.1/pbmset";

var mongoose = require('mongoose');
 
mongoose.connect(db_str);
//ProblemModel.find().then( (result) => {console.log(result)} );
app.use("/api/v1", restRouter );

app.listen( port, function() {
    console.log(`server running at port ${port}/`)
})