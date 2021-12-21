// External Packages
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');


// Router
const xmemeRouter = require('./routes/xmemeRouter')

// Connecting database
mongoose.connect(process.env.DATABASE, { 
    useNewUrlParser: true,              
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
}) 
.then( () => {
    console.log("DB Connected");
}).catch((err) => {
    console.log('Error is ' + err);
})

// Configuring external packages
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

// Using router
app.use('/', xmemeRouter);

// Specifying port
const PORT = process.env.PORT || 8081;

app.listen(PORT, () => {
    console.log(`Secure connection established on port ${PORT}`);
})
