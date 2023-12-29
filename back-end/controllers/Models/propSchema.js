const mongoose = require('mongoose');

const propSchema = new mongoose.Schema({
    propname:{
        type:String,
        required:true
    },
    state:{
        type:String,
        required:false
    },
    type:{
        type:String,
        required:false
    },
    propcount:{
        type:Number,
        required:true
    },
    propaddress:{
        type:String,        
    },
    propImg:{
        type:String,
        required:true
    },
    timestamp: {
        type: Date,
        default:new Date()
    }      
});

const properties = mongoose.model("properties", propSchema);
module.exports = properties;