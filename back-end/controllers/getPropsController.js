const { query } = require('express');
const SCHEDULES = require('./Models/propSchedules');
const PROPS = require('./Models/propSchema');
const ObjectId = require('mongoose').Types.ObjectId;


const getAllProperties = (req,res) => {
    PROPS.find().then((response) => {        
        res.status(200).json(response);
    })
    .catch((err) => {
        res.status(500).json(err);
    });
}

const getSinglePropData = async (req,res) => {
    try{
    const result = await PROPS.findOne({_id:req.query.propId})
        res.status(200).json(result)
    } catch(error){
        res.status(500).json(error)
    }
}

const dayWiseSlotFunction = (req,res) => {
    console.log("date is", req.query.date);
    let currentHour = new Date(req.query.date).getHours();
    let currentDate = new Date(new Date(req.query.date).setUTCHours(0,0,0,0));     // to change the date format to format in database
    
    console.log(currentHour);
    SCHEDULES.aggregate([
        {
            $match: {
                propId : new ObjectId(req.query.propId),
                date: currentDate,
                "slot.id":{$gt:currentHour}
            }
        },
        {
            $lookup: {
                from:'properties',   //database collection name
                localField:'propId',  //local field which we need to compare with the other collection field
                foreignField:'_id',   // field on the lookup collection that wecompare
                as:'property'
            }                            // Out puts Array
        },
        {
         $project: {
            property: { $arrayElemAt:["$property",0] },     //to convert the fetched array element(property) to an Object
            _id:1,                //projecting fields
            date:1,
            slot:1,
            bookedBy:1
         },
        },
    ])
    .then((resp) => {
        console.log(resp,"response");
        res.status(200).json(resp);
     })
    .catch((err)=>{
        console.log(err);
    })
}

module.exports = {getAllProperties,getSinglePropData,dayWiseSlotFunction}