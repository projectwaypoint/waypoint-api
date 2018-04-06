// Import
const express = require('express');
const bodyParser = require('body-parser');

// Instantiate
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// default route
app.get('/', (req, res) => {
    res.json({"message": "Welcome to the Waypoint REST API."});
});

// listen for requests
app.listen(80, () => {
    console.log("Server is listening on port 80");
});