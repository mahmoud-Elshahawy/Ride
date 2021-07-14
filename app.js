var express=require("express");
var app=express();
var mongoose=require("mongoose");
var bodyParser=require("body-parser");
var param = require("./params/param");
mongoose.connect(param.connection,{useUnifiedTopology:true, useNewUrlParser:true, useCreateIndex:true});
mongoose.set('useFindAndModify', false);
app.set("port",process.env.PORT || 3000);
app.use(bodyParser.json());
app.use("/",require("./routes/api"));
app.listen(app.get("port"),function(){
    console.log("Success: "+ app.get("port"));
});