var mongoose = require('mongoose'); 
  
var imageSchema = new mongoose.Schema({ 
    name: String, 
    img: { 
        data: Buffer, 
        contentType: String 
    },
    thumb: {
        data: Buffer, 
        contentType: String 
    } 
}); 

const Image = mongoose.model('Image', imageSchema);
  
module.exports = {
    Image
}