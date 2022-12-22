const express = require("express");

const db = require('./db')
const Pizza = require('./models/PizzaModel')

const app = express();

app.use(express.json());
const pizzaRoute = require('./routes/pizzasRoute')
const userRoute=require('./routes/userRoute')


app.use('/api/pizzas/', pizzaRoute)
app.use('/api/user/', userRoute)
app.get("/", (req, res) => {

    res.send("Server Working!");

});




const port = process.env.PORT || 8070;

app.listen(port, () => `Server is up and running on port number: ${port}`);