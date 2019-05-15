const express = require('express')
const dependencies = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');


dependencies.use(cookieParser())
dependencies.use(bodyParser.json());
dependencies.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
    origin: 'http://localhost',
    credentials: true
}));
dependencies.use(morgan('short'));



module.exports = dependencies;