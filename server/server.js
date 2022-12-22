const express = require("express");


const Pizza = require('./models/PizzaModel')

const app = express();
const db = require('./db')
app.use(express.json());





const pizzaRoute = require('./routes/pizzasRoute')
const userRoute = require('./routes/userRoute')
const ordersRoute = require('./routes/ordersRoute')


app.use('/api/pizzas/', pizzaRoute)
app.use('/api/users/', userRoute)
app.use('/api/orders/', ordersRoute)
app.get("/", (req, res) => {

    res.send("Server Working!");

});




const port = process.env.PORT || 8070;

app.listen(port, () => `Server is up and running on port number: ${port}`);