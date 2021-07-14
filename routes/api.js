var express= require("express");
var router= express.Router();
var Car = require("../models/cars");
var Garage = require("../models/garage");
var Trip= require("../models/trip");
const url = require('url');
var GarageID=null;
const { render } = require("ejs");
router.get("/test",function(req,res){
    res.render('test');
})

router.get('/get-car',async function(req,res){
    var latitude=req.body.lat;
    var longitude=req.bodylong;
    var coordinates=[lat,long];
    var carClass=req.body.class;
try{
    const rez = await Garage.findOne({
        location: {
         $nearSphere: { $geometry:{
             type : "Point",
             coordinates : coordinates
         }}
        }
      });
      GarageID=rez._id;
      const car = await Car.find({garageID: rez._id, class:carClass});
      console.log(car);
      res.send(car);
}
catch(err){
    res.status(400).send(err);
}
});
router.post("/start-trip",async function(req,res){
    var car=req.body.car;
    var garage=GarageID;
    var start=req.body.start;
    var user=req.body.user;
    var state={state:"Booked"};
    console.log(req.body);
    try{
        let current_car=await Car.findOne({_id:car});
        const trip=new Trip({
            CarID:car,
            StartGarageID:garage,
            UserID:user,
            BookingTime:start,
            Brand:current_car.brand,
            Color:current_car.color
        })
        const saved=await trip.save();
        current_car=await Car.findOneAndUpdate({_id:car},state);
        res.status(200).send("Trip Started");
    }
    catch(error){
        res.status(400).send(error);
    }
})
module.exports=router;