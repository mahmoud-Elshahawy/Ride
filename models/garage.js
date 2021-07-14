const mongoose = require('mongoose');
const randToken = require('rand-token');



const garageSchema = new mongoose.Schema({

    UUID: {
        type: String,
        default: function() {
            return randToken.generate(16);
        },
        unique: true
    },
    
    zoneID : {
      type: String,
      required: true

    },
      
    state : {
        type: String,
        default: "Available"
    },
    
    location: {
        type: { 
          type: String, // Don't do `{ location: { type: String } }`
          enum: ['Point'], // 'location.type' must be 'Point'
        },
        coordinates: {
          type: [Number],
          required: true,
          

        },
      },
    

    //  class : 

    //      [{ type: mongoose.Schema.ObjectId, ref: 'classes' }]

    //  ,
    //  image : {
    //      data: Buffer,
    //      contentType: String,
    //      //required: true

    //  }

});
garageSchema.index({ location: "2dsphere" });

var garage= mongoose.model('garage',garageSchema);
module.exports = garage;