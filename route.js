const express = require('express');
const multer = require('multer');
const ejs = require('ejs');
const path = require('path');
const sharp = require('sharp')
var bodyParser = require('body-parser'); 
var mongoose = require('mongoose') 
var fs = require('fs'); 

const Image = require('./schema').Image

module.exports.postreq = (req, res, next) => {
    if(!req.file){
        res.render('index', {
            msg: 'Error: No File Chosen'
        })
    }else{
        const filetypes = /jpeg|jpg|png|gif/;
        const extname = filetypes.test(path.extname(req.file.originalname).toLowerCase()); 
        const mimetype = filetypes.test(req.file.mimetype);  
        if(extname && mimetype){
            try {
                sharp(req.file.path).resize(200, 200).toBuffer()
                    .then( data => {
                        const newImage = new Image({
                            name: Date.now(),
                            thumb: {
                                data: data,
                                contentType: 'image/png'
                            },
                            img: {
                                data: fs.readFileSync(req.file.path),
                                contentType: 'image/png'
                            }
        
                        })
                        newImage.save()
                            .then(() => {
                                res.redirect('/thumbnails')
                            })
                            .catch(err => console.log(err))
                    })
                    .catch(err => console.log(err))
            } 
            catch (error) {
                console.error(error);
            }
        } else{
            res.render('index', {
                msg: 'Error: Images Only'
            })
        }
    }

}


module.exports.thumbnail = (req, res) => {
    Image.find({}, (err, images) => { 
        if (err) { 
            console.log(err); 
        } 
        else { 
            res.render('thumbnail.ejs', { images: images }); 
        } 
    }); 
}

module.exports.imageview = (req, res) => {
    Image.findOne({_id: req.params.id})
        .then(image => {
            if(image){
                res.render('imgview', {image: image.img})
            }else{
                res.render('thumbnails')
            }
        })
        .catch(err => console.log(err))
}