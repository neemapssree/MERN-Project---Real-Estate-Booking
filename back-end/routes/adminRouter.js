var express = require('express');
var router = express.Router();
const { addProperty } = require('../controllers/adminController');

const multer = require('multer');
const { adminAuth } = require('../middlewares/authorization');

const fileStorage = multer.diskStorage({
    destination:(req,file,cb)=> {        
        cb(null,'public/properties')
    },
    filename:(req,file,cb)=>{
        cb(null,Date.now()+"-"+file.originalname)        
        // cb(null, file.originalname)
    }
})


const upload = multer({storage:fileStorage});

router.post('/addProperty',adminAuth,upload.single('image'), addProperty);      // before devaiting to addProeprty, will modify the image file using multer

module.exports=router;