const express = require('express');
const multer = require('multer');
const ejs = require('ejs');
const path = require('path');
const sharp = require('sharp')
var bodyParser = require('body-parser'); 
var mongoose = require('mongoose') 
var fs = require('fs'); 

const app = express();

app.set('view engine', 'ejs');
app.use(express.static('./public'));

var { upload } = require('./multerfunctions')
var route = require('./route')

const db = require('./config/keys').MongoURI;
mongoose.connect(db, {
            useNewUrlParser: true,
            useUnifiedTopology: true, 
            useCreateIndex: true,
            useFindAndModify: false
        })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err))

app.get('/', (req, res) => res.render('index'));
app.get('/thumbnails', route.thumbnail)
app.get('/image/:id', route.imageview)

app.post('/', upload.single('image'), route.postreq)
// app.post('/', route.postreq)

const port = 3000;

app.listen(port, () => console.log(`Server started on port ${port}`));