const pass = require("./credentials").pass;
const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const Data = require("./data");
const { ObjectId } = require("mongodb");
const assert = require('assert');

const API_PORT = 3001;
const app = express();
const router = express.Router();

// this is MongoDB database
const dbRoute = pass;

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// connects back end code with the database
mongoose.connect(
  dbRoute,
  { useNewUrlParser: true }
);

let db = mongoose.connection;

db.once("open", () => console.log("connected to the database"));

// checks if connection with the database is successful
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// (optional) only made for logging and
// bodyParser, parses the request body to be a readable json format
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger("dev"));

// this is get method
// this method fetches all available data in our database
router.get("/getData", (req, res, next) => {
  Data.find((err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  });
});

// this is create methid
// this method adds new data in our database
router.post("/putData", (req, res, next) => {
  let data = new Data();

  const { id, email, username, password } = req.body;

  console.log(id, email, username, password);

  if ((!id && id !== 0) || !email || !username || !password) {
    return res.json({
      success: false,
      error: "INVALID INPUTS"
    });
  }
  data.username = username;
  data.email = email;
  data.password = password;
  data.id = id;
  data.save(err => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

router.post("/validate", (req, res, next) => {
  let data = new Data();

  const { username, password } = req.body;
  console.log(username + "  " + password);

  Data.findOne({ username }, (err, user) => {
    if (err) throw err;
    
    if (user) {
      user.comparePassword(password, function(err, isMatch) {
        if (err) throw err;
        console.log(password, isMatch); // -> Password123: true
        return res.json({ valid: isMatch });
      });
    } else {
      return res.json({ valid: false });
    }
  });
});

// append /api for our http requests
app.use("/api", router);

// launch our backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));