const express = require("express");
const bodyParser = require("body-parser");


const Pizza = require('./models/PizzaModel')
const User = require('./models/userModel')
const Feedback = require('./models/feedbackModel')
 //const Admin=require('./models/adminModel')


const app = express();
const db = require('./db')
app.use(express.json());
app.use(bodyParser.json());







//const adminRoute=require('./routes/adminRoute')
const pizzaRoute = require('./routes/pizzasRoute')
const userRoute = require('./routes/userRoute')
const ordersRoute = require('./routes/ordersRoute')
const feedbackRoute = require('./routes/feedbackRoute')


//app.use('/api/admin/',adminRoute)
app.use('/api/pizzas/', pizzaRoute)
app.use('/api/feedback/', feedbackRoute)
app.use('/api/users/', userRoute)
app.use('/api/orders/', ordersRoute)
app.get("/", (req, res) => {

    res.send("Server Working!");

});




const port = process.env.PORT || 8070;

app.listen(port, () => `Server is up and running on port number: ${port}`);