const PROPS = require('./Models/propSchema');

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
            res.status(500).json('Error adding property');
        }
    };
 
module.exports= {addProperty}