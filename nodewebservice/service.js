const express = require('express');
const cors = require('cors');
const service = express();
const port = 1339;
const db = require("./pgdbstudent.js");

service.use(express.json());
service.use(express.urlencoded({extended: true}));

let corsOptions = {
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: "Authorization, Origin, Content-Type, Accept, X-Requested-With",
    maxAge: 0
};

service.use(cors(corsOptions));

service.get('/', (req, res) => {
    res.send("Welcome!");
});

service.get('/hi', (req, res) => {
    res.send("Hello!");
});

service.get('/hello/:name', (req, res) => {
    res.send(`Hello ${req.params.name}`);
});

service.get('/error', (req, res) => {
    res.status(403).end();
});

service.post('/dogs', (req, res) => {
    let result = {
        id: 101,
        name: req.body.name,
        breed: req.body.breed,
        age: req.body.age
    };
    res.send(result);
});

service.post('/students', async (req, res) => {
    await db.Insert({
        Name: req.body.name,
        Age: req.body.age,
        Course: req.body.course
    }, res);
});

service.delete('/students/:id', async (req, res) => {
    await db.Delete(parseInt(req.params.id), res);
});

service.get('/students', async (req, res) => {
    if (typeof req.query.name === "string") {
        await db.SelectByName(req.query.name, res);
    } else {
        await db.Select(res);
    }
});

service.get('/students/:id', async (req, res) => {
    await db.SelectById(parseInt(req.params.id), res);
});

service.listen(port, () => console.log(`Example web service listening at http://localhost:${port}`));