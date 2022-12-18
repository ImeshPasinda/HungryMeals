const express = require("express");

const db = require('./db')


const app = express();

app.use(express.json());



app.get("/", (req, res) =>{

    res.send("Server Working!");

});


const port = process.env.PORT || 8070;

app.listen(port, () => `Server is up and running on port number: ${port}`);