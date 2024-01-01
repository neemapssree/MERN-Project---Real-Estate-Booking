const PROPS = require('./Models/propSchema');

const getAllProperties = (req,res) => {
    PROPS.find().then((response) => {
        res.status(200).json(response)
    }).catch((err)=>{
        res.status(500).json(err)
    })
}

const getSinglePropData = async (req,res) => {
    try{
    const result = await PROPS.findOne({_id:req.query.propId})
        res.status(200).json(result)
    } catch(error){
        res.status(500).json(error)
    }
}

module.exports = {getAllProperties,getSinglePropData}