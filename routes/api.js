var express= require("express");
var router= express.Router();
var Car = require("../models/cars");
var classes = require("../models/class");
var Garage = require("../models/garage");
var Trip= require("../models/trip");
const url = require('url');
var GarageID=null;
const { render } = require("ejs");
const { json } = require("body-parser");
router.get("/get-class",async function(req,res){
    try{
        const class_fare = await classes.findOne({class: req.query.Class});
          res.send(class_fare);
    }
    catch(err){
        res.status(400);
    }
})

router.get('/get-car',async function(req,res){
    var lat=req.query.lat;
    var long=req.query.long;
    var coordinates=[lat,long];
    var carClass=req.query.Class;
    console.log(coordinates)
   
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
      console.log(GarageID)
      const car = await Car.find({garageID: rez._id, class:carClass});
      res.send(car);
}
catch(err){
    res.status(400).send(err);
}
});
router.post("/start-trip",async function(req,res){
    var car=req.body.car;
    console.log(typeof(car));
    var garage=req.body.garage;
    var start=req.body.start;
    var user=req.body.user;
    var state={state:"Booked"};
    var book=Date.now();
    console.log(req.body);
    try{
        let current_car=await Car.findOne({_id:car});
        console.log(current_car)
        const trip=new Trip({
            CarID:car,
            StartGarageID:garage,
            UserID:user,
            BookingTime:start,
            Brand:current_car.brand,
            Color:current_car.color,
            BookingTimeml:book
        })
        const saved=await trip.save();
        console.log(saved)
        current_car=await Car.findOneAndUpdate({_id:car},state);
        res.status(200).send("Trip Started");
    }
    catch(error){
        res.status(400).send(error);
    }
})
module.exports=router;