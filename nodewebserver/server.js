const express = require('express');
const path = require('path');
const Axios = require('axios');

const server = express();
const port = 80; //change to port 80 unless already in use
let dirname = __dirname;

//for parsing application/json
server.use(express.json());

//for parsing application/x-www-form-urlencoded
server.use(express.urlencoded({extended: true}));

server.use(express.static(path.join(dirname, '/public'), {
    extensions: ['htm', 'html']
}));

server.post('/addstudent', async (req, res) => {
        try {
            let containerName = "webservice";
            let serviceResponse = await Axios.post(`http://${containerName}:1339/students`, {
                        name: req.body["name-textbox"],
                        age: req.body["age-numberbox"],
                        course: req.body["course-textbox"]
                    }
                )
            ;
            console.log(`Service response = ${serviceResponse.status}`);
            res.redirect('thanks.html');
        } catch
            (error) {
            console.log(error);
            res.status(403).end();
        }
    }
)

server.listen(port, () => console.log(`Example web server listening at http://localhost:${port}`));