const express = require("express");




const app = express();

app.use(express.json());



app.get("/", (req, res) =>{

    res.send("Mongodb Connection Success!");

});


const port = process.env.PORT || 8070;

app.listen(port, () => `Server is up and running on port number: ${port}`);