const express = require("express");

const db = require('./db')
const Pizza = require('./models/PizzaModel')

const app = express();

app.use(express.json());



app.get("/", (req, res) => {

    res.send("Server Working!");

});


app.get("/getpizzas", (req, res) => {

    Pizza.find({}, (err, docs) => {

        if (err) {
            console.log(err);
        }
        else {
            res.send(docs)
        }
    })

});


const port = process.env.PORT || 8070;

app.listen(port, () => `Server is up and running on port number: ${port}`);