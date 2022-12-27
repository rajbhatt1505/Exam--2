const express = require('express');
const nodemon = require('nodemon');
const bodyParser = require('body-parser');
const app = express();
const fastestValidator = require("fastest-validator");
// const v = new Validator();

const port = process.env.port || 8080
const authRoute = require('./routes/auth-route');
const mongoose = require('mongoose');
const cors = require('cors')
const cookieParser = require("cookie-parser");
const { default: Validator } = require('fastest-validator');

// app.use (fastestValidator())
// app.use (Validator())

app.use(cookieParser())

mongoose.connect('mongodb://localhost:27017/Mean-', (err) => {
    if (err) {
        console.log("Database is Not Connected !");
    } else {
        console.log("DB is Connected........");
    }
});

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(
    cors({
      origin: ["http://localhost:4200", "*"],
      credentials: true,
    })
  );
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:4200");
    res.header("Access-Control-Allow-Methods", "GET, POST, HEAD, OPTIONS, PUT, PATCH, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token, x-refresh-token, _id,authorization");
  
    next();
  });
app.use('/auth', authRoute);
app.get('/', (req, res) => {
    res.send("Welcome  here")
})

app.listen(port, () => {
    console.log("Node server is Connected", port);
})


app.post('/',(req,res)=>{
  var displayName = req.body.displayName
  var email = req.body.email
  var password = req.body.password
const check = v.compile(schema)
 check({
  displayName:displayName,
  email:email,
  password:password
 })

  console.log(displayName);
  console.log(email);
  console.log(password);
  console.log(result);
})