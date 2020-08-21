const multer = require('multer');
const path = require('path');

var Image = require('./schema.js').Image

var n = '11'

var checkFileType = (file, cb) => {
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);  

    if(mimetype && extname){
        return cb(null,true);
    } else {
        cb('Error: Images Only!');
    }
}


const storage = multer.diskStorage({
    destination: './public/uploads/',
    filename: function(req, file, cb){
        n = Date.now() + path.extname(file.originalname)
        cb(null, n);
        module.exports.n = n
    }
});

module.exports.upload = multer({
    storage: storage,
    limits:{fileSize: 1000000},
    fileFilter: function(req, file, cb){
        checkFileType(file, cb);
    }
});


