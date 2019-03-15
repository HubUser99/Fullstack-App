const pass = require("./credentials").pass;
const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const Data = require("./data");
const Token = require("./token");
const { ObjectId } = require("mongodb");
const assert = require('assert');
const nodemailer = require('nodemailer');
const crypto = require('crypto');

const GLOBAL_IP = '::ffff:192.168.0.105';
const API_PORT = 3001;
const app = express();
const router = express.Router();

// this is MongoDB database
const dbRoute = pass;

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
app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});
app.use((req, res, next) => {
	const ip = req.connection.remoteAddress;
	console.log(req.connection.remoteAddress);
	next();
});

/*
// this is get method
// this method fetches all available data in our database
router.get("/getData", (req, res, next) => {
	Data.find((err, data) => {
		if (err) return res.json({ success: false, error: err });
		return res.json({ success: true, data: data });
	});
});
*/

router.get("/getLast", (req, res, next) => {
	Data.
		findOne({}).
		sort({ id: -1 }).
		select({ username: 1, id: 1 }).
		exec(function (err, data) {
			if (err) return res.json({ success: false, error: err });
			console.log(data);
			return res.json({ success: true, username: data.username, id: data.id });
		});
});

// this is create method
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
		
		var token = new Token({ _userId: data._id, token: crypto.randomBytes(16).toString('hex') });
		
		token.save(err => {
			if (err) return res.json({ success: false, error: err });
			var transporter = nodemailer.createTransport({ service: 'Sendgrid', auth: { user: process.env.SENDGRID_USERNAME, pass: process.env.SENDGRID_PASSWORD } });
			var mailOptions = { from: 'no-reply@usercount.com', to: data.email, subject: 'Account Verification Token', text: 'Hello,\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + req.headers.host + '\/api\/confirmation\/' + token.token + '.\n' };
			transporter.sendMail(mailOptions, err => {
				if (err) return res.json({ success: false, error: err });
				res.status(200).send('A verification email has been sent to ' + data.email + '.');
			});
		});
	});
});

router.get("/confirmation/:token", (req, res, next) => {
	console.log(req.params);
	Token.findOne({token: req.params.token}, (err, token) => {
		if (!token) return res.status(400).send({ type: 'not-verified', msg: 'We were unable to find a valid token. Your token may have expired.' });
		Data.findOne({_id: token._userId}, (err, data) => {
			if (!data) return res.status(400).send({ msg: 'We were unable to find a user for this token.' });
			if (data.isVerified) return res.status(400).send({ type: 'already-verified', msg: 'This user has already been verified.' });

			data.isVerified = true;
			data.save(function (err) {
				if (err) { return res.status(500).send({ msg: err.message }); }
				res.status(200).send("The account has been verified. Please log in.");
			});
		});
	});
});

router.post("/validate", (req, res, next) => {
	let data = new Data();

	const { username, password } = req.body;
	console.log(username + "  " + password);

	Data.findOne({ username }, (err, user) => {
		if (err) throw err;
		
		if (!user.isVerified) {
			return res.json({ valid: false, error: "Authorization failed." });
		}

		if (user) {
			user.comparePassword(password, function(err, isMatch) {
				if (err) throw err;
				console.log(password, isMatch);
				user.active = true;
				crypto.randomBytes(16, (err, buffer) => {
					user.session_id = buffer.toString('hex');
					user.save(err => {
						return res.json({ valid: isMatch, username: user.username, session_id: user.session_id, error: "Authorization failed." });
					});
				});
			});
		} else {
			return res.json({ valid: false, error: "Authorization failed." });
		}
	});
});

router.post("/logout", (req, res, next) => {
	const session_id = req.body.session_id;
	Data.findOne({ session_id: session_id }, (err, user) => {
		if (err) return res.status(400).send(err);
		if (user.active) {
			if (session_id === user.session_id && user.session_id !== "") {
				user.active = false;
				user.session_id = null;
				user.save(err => {
					if (err) throw err;
					return res.status(200).send("You have been logged out.");
				});
			}
		} else {
			return res.status(403).send("User is not logged in.");
		}
	});
});

// append /api for our http requests
app.use("/api", router);

// launch our backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));