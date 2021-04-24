const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const db = require('./db/index');

// import User Model
var User = require('./models/user.model');

var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));
app.use("/images", express.static(path.join("images")));

app.use(cors());

app.use((request, response, next)=> {
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.setHeader("Access-Control-Allow-Headers",
                    "Origin, X-Requested-With, Content-Type, Accept");
  response.setHeader("Access-Control-Allow-Methods",
                    "GET, POST, PATCH, PUT, DELETE, OPTIONS");
  next();
});

app.use((req, res,next) => {
  console.log('reached server');
  let token = req.headers.authorization;
  User.findByToken(token,(err,user)=>{
    if(err) throw err;
      req.token = token;
      req.user = user;
      next();
  })

});


app.use('/api', indexRouter);


const frontend = express.static(path.join(__dirname,'../../dist/frontend'));
const front = express();
front.use("**", frontend);
// app.use('/users', usersRouter);

module.exports = app;
