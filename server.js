var express = require("express");
var app = express();
var mongoose = require("mongoose");
var bodyparser = require("body-parser");


mongoose.connect('mongodb://admin:admin@ds054308.mongolab.com:54308/labinventory');

app.use(express.static(__dirname + "/public"));
app.use(bodyparser.json());

var resistorScheme = mongoose.Schema({sort: String, value: String, number: Number});
var resistorsmodel = mongoose.model('resistor', resistorScheme);


app.get('/resistorlist', function(req,res)
{
	console.log("I received a get request");
	resistorsmodel.find().exec(function(err, docs)
	{
			res.json(docs);
	});
	
});
app.post('/resistorlist', function(req,res)
{
	console.log(req.body);
	var resistor;
	resistor = new resistorsmodel({
		sort: req.body.sort,
		value: req.body.value,
		number: req.body.number,
	});
	resistor.save(function(err)
	{
		if(!err){
			return console.log("created");
		}
		else{
			return console.log(err);
		}
		return res.json(resistor);
	});


});
app.delete("/resistorlist/:id", function(req,res)
{
	return resistorsmodel.findById(req.params.id, function(err, resistor)
	{
		return resistor.remove(function(err)
		{
			if(!err){
			return console.log("removed");
			return res.json(resistor);
		}
		else{
			return console.log(err);
		}
		});	
	});

});
app.get('/resistorlist/:id', function(req,res)
{
	return resistorsmodel.findById(req.params.id, function (err, resistor) {
    if (!err) {
      return res.json(resistor);
    } else {
      return console.log(err);
    }
  });
});
app.put("/resistorlist/:id", function(req,res)
{
	return resistorsmodel.findById(req.params.id, function (err, resistor) {
    resistor.sort = req.body.sort,
    resistor.value = req.body.value;
    resistor.number = req.body.number;
    return resistor.save(function (err) {
      if (!err) {
        console.log("updated");
      } else {
        console.log(err);
      }
      return res.json(resistor);
    });
  });

});

app.listen(process.env.PORT || 3000);
console.log('server running on port 3000');