var express = require("express");
var app = express();
var mongoose = require("mongoose");
var bodyparser = require("body-parser");


mongoose.connect('mongodb://admin:admin@ds059804.mongolab.com:59804/contactlistapp');

app.use(express.static(__dirname + "/public"));
app.use(bodyparser.json());

var contactScheme = mongoose.Schema({name: String, email: String, number: String});
var contactsmodel = mongoose.model('contacts', contactScheme);


app.get('/contactlist', function(req,res)
{
	console.log("I received a get request");
	contactsmodel.find().exec(function(err, docs)
	{
			res.json(docs);
	});
	
});
app.post('/contactlist', function(req,res)
{
	console.log(req.body);
	var contact;
	contact = new contactsmodel({
		name: req.body.name,
		email: req.body.email,
		number: req.body.number
	});
	contact.save(function(err)
	{
		if(!err){
			return console.log("created");
		}
		else{
			return console.log(err);
		}
		return res.json(product);
	});

	/*contacts.insert.exec(req.body, function(err,doc)
	{
	})*/
});
app.delete("/contactlist/:id", function(req,res)
{
	return contactsmodel.findById(req.params.id, function(err, product)
	{
		return product.remove(function(err)
		{
			if(!err){
			return console.log("removed");
			return res.json(product);
		}
		else{
			return console.log(err);
		}
		});	
	});
	
});
app.get('/contactlist/:id', function(req,res)
{
	return contactsmodel.findById(req.params.id, function (err, contact) {
    if (!err) {
      return res.json(contact);
    } else {
      return console.log(err);
    }
  });
});
app.put("/contactlist/:id", function(req,res)
{
	return contactsmodel.findById(req.params.id, function (err, contact) {
    contact.name = req.body.name;
    contact.email = req.body.email;
    contact.number = req.body.number;
    return contact.save(function (err) {
      if (!err) {
        console.log("updated");
      } else {
        console.log(err);
      }
      return res.json(contact);
    });
  });

});

app.listen(3000);
console.log('server running on port 3000');