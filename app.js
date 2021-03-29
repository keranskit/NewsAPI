const express = require('express');
const mongoose = require('mongoose');
const app = express();
const newsRoute = require('./routes/news');
const cors = require('cors');
const bodyParser = require('body-parser');
require ('dotenv/config');

app.use(cors());
app.use(bodyParser.json());

app.use('/news', newsRoute);

mongoose.connect(
    process.env.DB_CONNECTION, 
    () => console.log('connected to db')
);

app.listen(process.env.PORT || 3000);