var express = require("express");
var app = express();
var mongoose = require("mongoose");
var bodyparser = require("body-parser");
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var cookieParser = require('cookie-parser');
var session = require('express-session');
var crypto = require('crypto');

//set up static routes
app.use(express.static(__dirname + "/public"));

app.use(cookieParser());

//Use json body-parser
app.use(bodyparser.json());

//Use session
app.use(session({secret:'Lab inventory unicorns'}));

app.use(passport.initialize());
//connection to database
mongoose.connect('mongodb://admin:admin@ds054308.mongolab.com:54308/labinventory');

//All database code
var componentScheme = mongoose.Schema({sort: String, value: String, number: Number, imageurl: String});
var componentsmodel = mongoose.model('component', componentScheme);

var userSchema = mongoose.Schema({
	firstName : String,
	lastName : String,
	userName : String,
	salt: String,
	hashed_pwd: String
});
userSchema.methods = {
	authenticate: function (passwordToMatch){
		return hashPwd(this.salt, passwordToMatch) === this.hashed_pwd;
	}
}

var user = mongoose.model('User', userSchema);
user.find({}).exec(function(err,collection)
{
	if(collection.length == 0)
	{
		var salt, hash;

		salt = createSalt();
		hash = hashPwd(salt, 'Lorenz');
		user.create({firstName: "Lorenz", lastName: "Put", userName : "Lorenz", salt : salt, hashed_pwd: hash});

		salt = createSalt();
		hash = hashPwd(salt, 'Thomas');
		user.create({firstName: "Thomas", lastName: "Van Havere", userName : "Thomas", salt : salt, hashed_pwd: hash});

		salt = createSalt();
		hash = hashPwd(salt, 'Stefan');
		user.create({firstName: "Stefan", lastName: "Blommaert", userName : "Stefan", salt : salt, hashed_pwd: hash});
	}
})

function createSalt()
{
	return crypto.randomBytes(128).toString('base64');
}

function hashPwd(salt,pwd)
{
	var hmac = crypto.createHmac('sha1',salt);
	return hmac.update(pwd).digest('hex');
}
passport.use(new LocalStrategy(
	function(username, password, done)
	{
		user.findOne({userName:username}).exec(function(err,user)
		{
			if(user && user.authenticate(password))
			{
				return done(null, user);
			}
			else {
				return done(null, false);
			}
		})
	}
));


passport.serializeUser(function(user,done)
{
	if(user)
	{
		done(null, user._id);
	}
});
passport.deserializeUser(function(id,done)
{
	user.findOne({_id:id}).exec(function(err,user)
	{
		if(user)
		{
			return done(null, user);
		}
		else {
			done(null,false);
		}
	})
});



app.post('/login',function(req,res,next)
{
	var auth = passport.authenticate('local', function(err,user)
	{
		if(err)
		{
			return next(err);
		}
		if(!user)
		{
			res.send({success: false});
		}
		req.logIn(user,function (err)
		{
			if(err)
			{
				return next(err);
			}
			res.send({success : true, user: user})
		})
	})
	auth(req,res, next);
});

app.post('/logout', function (req,res) {
	req.logout();
	res.end();
});

app.post('/register', function (req,res) {
	salt = createSalt();
	hash = hashPwd(salt, req.body.password);
	user.create({
		firstName: req.body.firstname,
		lastName: req.body.lastname,
		userName: req.body.username,
		salt: salt,
		hashed_pwd: hash
	});
	res.end();

});
app.get('/componentlist', function(req,res)
{
	console.log("I received a get request");
	componentsmodel.find().exec(function(err, docs)
	{
			res.json(docs);
	});

});
app.post('/componentlist', function(req,res)
{
	console.log(req.body);
	var component;
	component = new componentsmodel({
		sort: req.body.sort,
		value: req.body.value,
		number: req.body.number,
		imageurl: req.body.imageurl
	});
	component.save(function(err)
	{
		if(!err){
			 console.log("created");
		}
		else{
			 console.log(err);
		}
		return res.json(component);
	});

});
app.delete("/componentlist/:id", function(req,res)
{
	return componentsmodel.findById(req.params.id, function(err, component)
	{
		return component.remove(function(err)
		{
			if(!err){
			 console.log("component removed");
			 res.json(component);
		}
		else{
			 console.log(err);
		}
		});
	});

});
app.get('/componentlist/:id', function(req,res)
{
	return componentsmodel.findById(req.params.id, function (err, component) {
    if (!err) {
       res.json(component);
    } else {
       console.log(err);
    }
  });
});
app.put("/componentlist/:id", function(req,res)
{
	return componentsmodel.findById(req.params.id, function (err, component) {
		component.sort = req.body.sort,
		component.value = req.body.value;
		component.number = req.body.number;
    return component.save(function (err) {
      if (!err) {
        console.log("updated");
      } else {
        console.log(err);
      }
      return res.json(component);
    });
  });

});

//Listen to port 7000
app.listen(process.env.PORT || 7000);
console.log('server running on port 7000');