const express = require("express");




const app = express();
const db = require('./db');
const pizzaRoute = require('./routes/pizzasRoute')
const userRoute=require('./routes/userRoute')
const Pizza = require('./models/PizzaModel')


app.use(express.json());
app.use('/api/pizza/', pizzaRoute)
app.use('/api/user/', userRoute)
app.get("/", (req, res) => {

    res.send("Server Working!");

});




const port = process.env.PORT || 8070;

app.listen(port, () => `Server is up and running on port number: ${port}`);