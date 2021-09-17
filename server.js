const express= require('express');
const mongoose= require('mongoose');
const bodyParser= require('body-parser');
const port=8000;
const app= express();
const User = require('./models/User'); // makes our User model available to use in express routes.
mongoose.connect('mongodb://localhost/userData') //connects us to a local mongoDB database called: userData.

app.use(bodyParser.json());

app.listen(port, ()=>{
	console.log(`server is listening on port:${port}`)
})


//Inside each (req,res) callback function we use mongoose methods on our User model to 
//Create, Read, Update, and Delete individual user documents in our users collection. 
//The "POST" route is different than the others because mongoDB automatically creates an ID for each document when it is created.

// CREATE
app.post('/users',(req,res)=>{
  User.create({
    name: req.body.newData.name,
    email:req.body.newData.email,
    password: req.body.newData.password
  },
  (err,data)=>{
    if(err){
      res.json({success:false,message:err})
    }
    else if(!data){
      res.json({success:false,message:"not found"})
    }
    else{
      res.json({success:true,data:data})
    }
  })
})

// We are using route chaining as a shorthand for the "GET", "PUT", and "DELETE" routes, 
//since they all use the /users/:id endpoint. The :id part of the endpoint is a variable which can be accessed in the "req.params"

app.route('/users/:id')
// READ
.get((req,res)=>{
  User.findById(req.params.id ,
    (err,data)=>{
      if(err){
        res.json({success:false,message:err})
      }
      else if(!data){
        res.json({success:false,message:"not found"})
      }
      else{
        res.json({success:true,data:data})
      }
    }
    )
})
// UPDATE
.put((req,res)=>{
  User.findByIdAndUpdate(
    req.params.id,
    {
      name:req.body.newData.name,
      email:req.body.newData.email,
      password:req.body.newData.password
    },
    {
      new:true
    },
    (err,data)=>{
      if(err){
        res.json({success:false,message:err})
      }
      else if(!data){
        res.json({success:false,message:"not found"})
      }
      else{
        res.json({success:true,data:data})
      }
    }
  )
})
// DELETE
.delete((req,res)=>{
  // User.findByIdAndDelete()
})