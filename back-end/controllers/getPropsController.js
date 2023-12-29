const PROPS = require('./Models/propSchema');

const getAllProperties = (req,res) => {
    PROPS.find().then((response) => {
        res.status(200).json(response)
    }).catch((err)=>{
        res.status(500).json(err)
    })
}

module.exports = {getAllProperties}