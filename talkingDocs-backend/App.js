const express = require('express');
const cors = require("cors");
const App = express();
const env = require('dotenv').config()
const port = process.env.PORT;
const db = require('./Config/mongoose')
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

App.use(express.json()); 
App.use(bodyParser.json());
App.use(bodyParser.urlencoded({ extended: true }));
App.use(cookieParser());
App.use(express.static('./Public'))
App.use('/Public', express.static(__dirname + '/Public'));
App.use(cors());

App.use('/', require('./Routes/index'))
App.listen(port,() => console.log("TalkingDocs listening on port: " + port));