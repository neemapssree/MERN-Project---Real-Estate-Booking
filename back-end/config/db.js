const mongoose = require('mongoose');

const connectDB = async () => {
    try { 
        const connection = await mongoose.connect('mongodb://127.0.0.1:27017/realestateapp', {
            useNewUrlParser:'true'
        })
        console.log("MongoDB connected");
    } catch(err) {
        console.log(err);
    }
}

module.exports=connectDB;