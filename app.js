const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
var jwt = require('jsonwebtoken');

const JWT_SECRET = "toDo";


const indexRouter = require('./routes/index');
const user = require('./routes/user');
const task = require('./routes/task');
const login = require('./routes/login');


const app = express();


app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/user', user);
app.use('/task', task);
app.use('/login', login);

module.exports = app;
