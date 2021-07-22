const mongoose = require('mongoose');
const randToken = require('rand-token');
var date=Date();


const tripSchema = new mongoose.Schema({

    UUID: {
        type: String,
        default: function() {
            return randToken.generate(16);
        },
        unique: true
    },
    
    StartGarageID : {
      type: String,
      required: true

    },      
    BookingTime : {
        type: Date
    },
    BookingTimeml:{
        type:Number
    },
    Rate: {
        type: Number,
        default:0
      },
      TotalFees:{
        type:Number,
        default:0
      },
      UserID:{
          type:String
      },
      CarID:{
          type:String
      },
      EndGarageID:{
          type:String
      },
      DropOffTime:{
          type:Date
      },
      DropOffTimeml:{
        type:Number
    },
      Color:{
          type:String
      },
      Brand:{
          type:String
      }


});

var trip= mongoose.model('trip',tripSchema,'trip');
module.exports = trip;