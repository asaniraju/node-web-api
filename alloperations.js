var express=require("express");

var app=express();

var router=express.Router();

var mongoose=require("mongoose");

var Customer=require("./models/customer");

var bodyParser =require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))

mongoose.connect("mongodb://localhost/techminds",function(){
	console.log("succcessfully connected to database!!")
})

router.get("/", function(request, response){
	response.json({name:"John Galt"})
})

router.get("/customers", function(request, response){
    Customer.getCustomers(function(err,customerdata){
    	if(err){
    		throw err;
    	}
    	response.json(customerdata)
    })
})

router.post("/customer",function(request, response){

	var customerObj=request.body;

	Customer.createCustomer(customerObj,function(err,data){
		if(err){
    		throw err;
    	}
    	response.json(data)
	})
})
router.put("/customer/:id",function(request, response){

	var userId= request.params.id;

	var customerObj=request.body;
	// Customer.editCustomer(userId, customerObj,function(err,data){

	// 	if(err){
	// 		throw err;
	// 	}
	// 	response.json(data)
	// })

	Customer.getCustomerById(userId, function(err,data){

		if(err){
			throw err;
		}
		response.json(data)
	})
})

router.delete("/customer/:id",function(request, response){

	var userId= request.params.id;

	var customerObj=request.body;

	Customer.removeCustomer(userId, function(err,data){

		if(err){
			throw err;
		}
		response.json(data)
	})
})

router.get("/customer/:id",function(request, response){

	var userId= request.params.id;

	var customerObj=request.body;

	// Customer.getCustomerById(userId, function(err,data){

	// 	if(err){
	// 		throw err;
	// 	}
	// 	response.json(data)
	// })
})

app.use("/api",router);

var PORT =process.env.PORT || 1337;

app.listen(PORT,function(){
	console.log("server Listening at port 1337!!"+PORT)
})