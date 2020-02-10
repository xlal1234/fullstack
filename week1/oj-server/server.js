var express = require('express')
var app = express()
var restRouter = require("./routes/rest")
const port = '3000'

app.use("/api/v1", restRouter );

app.listen( port, function() {
    console.log(`server running at port ${port}/`)
})