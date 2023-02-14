const express = require('express');
const cors = require('cors');
const service = express();
const port = 1339;

service.use(express.json());
service.use(express.urlencoded({extended:true}));

let corsOptions = {
	origin: "*",
	methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
	allowedHeaders:"Authorization, Origin, Content-Type, Accept, X-Requested-With",
	maxAge: 0
};

service.use(cors(corsOptions));

service.get('/', (req,res) => {
	res.send("Welcome!");
});

service.get('/hi', (req,res) => {
	res.send("Hello!");
});

service.get('/hello/:name', (req,res) => {
	res.send(`Hello ${req.params.name}`);
});

service.get('/error', (req,res) => {
	res.status(403).end();
});

service.post('/dogs', (req,res) => {
	let result = {
		id:101,
		name:req.body.name,
		breed:req.body.breed,
		age:req.body.age
	};
	res.send(result);
});

service.post('/students', async (req, res) => {
    console.log("Add student");
    console.log(req.body.name);
    console.log(req.body.age);
    console.log(req.body.course);
    res.status(201).send({
        Id: 101,
        Name: req.body.name,
        Age: req.body.age,
        Course: req.body.course
    });
});

service.delete('/students/:id', async (req, res) => {
    console.log("Delete student");
    console.log(req.params.id);
    res.send({});     // 200 is the default status code
});

service.get('/students', async (req, res) => {
     let data = [];                                             
     if(typeof req.query.name === "string")
     {
          console.log("Read the students' details");
          console.log(req.query.name);
          data[0] = { Id: 1, Name:req.query.name, Age:23, Course: "SE" };
          data[1] = { Id: 2, Name:req.query.name, Age:24, Course: "WD" };	
     }
     else
     {
          console.log("Read all student details");
          data[0] = { Id: 1, Name:"Fred", Age:23, Course: "SE" };
          data[1] = { Id: 2, Name:"Bob", Age:24, Course: "WD" };
      }
      res.send(data);
});

service.get('/students/:id', async (req, res) => {
    console.log("Read a student's details");
    console.log(req.params.id);
    res.send( { Id: req.params.id, Name:"Fred", Age:23, Course: "SE" } );
});

service.listen(port, () => console.log(`Example web service listening at http://localhost:${port}`));