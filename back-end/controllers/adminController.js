const { json } = require('express');
const PROPS = require('./Models/propSchema');
const   PROP_SCHEDULES = require('./Models/propSchedules');
const { response } = require('../app');

const addProperty = async (req,res) => {
    try{
        console.log(req.body, 'Hai....');
        await PROPS({propname:req.query.propname,
            state:req.query.state,
            type:req.query.type,
            propcount:req.query.propcount,
            propaddress:req.query.propaddress,
            propImg:req.file.filename}).save()
            res.status(200).json('Property added successfully');
        }catch (error) {
            res.status(500).json(error);
        }
    };

const addTimeSlotData = (req,res) => {
    try{
        // console.log(req.body, '');
        const {startDate, endDate, selectedTimings, propId} = req.body;   //Destructuring method
        // console.log(startDate, endDate, selectedTimings, propId);
        let firstDate = new Date(startDate);
        const lastDate = new Date(endDate);
        const slotObject = [];

        while(firstDate <= lastDate) {
            for (let data of selectedTimings) {
                console.log(firstDate, "first date");
                slotObject.push({
                    date:JSON.parse(JSON.stringify(firstDate)),    //To pass the date as value instead od reference use json parse
                    slot:{
                        name:data.name,
                        id:data.id,
                    },
                    propId,
                })
            }
            firstDate.setDate(firstDate.getDate()+1);
        }
        PROP_SCHEDULES.insertMany(slotObject).then((resp)=>{            
            res.status(200).json('Time slot created Successfully');
        })
        
        console.log(slotObject,"slot");
        }catch (error) {
            
        }
    };
 
module.exports= {addProperty,addTimeSlotData}