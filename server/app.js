const express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    path = require('path'),
    mongoose = require('mongoose'),
    port = process.env.PORT || 8080,
    dburl = process.env.DBURL || 'mongodb://localhost:27017/profile';
// Setup MongoDB
mongoose.connect(dburl, { useNewUrlParser: true })
.then((db)=>{
    console.log(`connected to DB`);
})
.catch((err) => console.error('DB ERROR:', err));

// Import routes
const indexRoutes = require('./routes/index');

// APP Config
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname + '/views'));
app.use(express.static(path.join(__dirname + '../../client/public/')));
app.use(bodyParser.urlencoded({extended: true}));

// Use routes
app.use(indexRoutes);
// APP Listen
app.listen(port,()=> console.log(`Serving on port ${port}`));