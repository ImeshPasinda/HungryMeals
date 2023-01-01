const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const Pizza = require('./models/PizzaModel')
const User = require('./models/userModel')
const Admin = require('./models/adminModel')
const Feedback = require('./models/feedbackModel')
const Notification = require('./models/notificationModel')


const app = express();
const db = require('./db')
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());







const pizzaRoute = require('./routes/pizzasRoute')
const userRoute = require('./routes/userRoute')
const adminRoute = require('./routes/adminRoute')
const ordersRoute = require('./routes/ordersRoute')
const feedbackRoute = require('./routes/feedbackRoute')
const notificationRoute = require('./routes/notificationRoute')



app.use('/api/pizzas/', pizzaRoute)
app.use('/api/feedback/', feedbackRoute)
app.use('/api/users/', userRoute)
app.use('/api/admins/', adminRoute)
app.use('/api/orders/', ordersRoute)
app.use('/api/notifications/', notificationRoute)
app.get("/", (req, res) => {

    res.send("Server Working!");

});




const port = process.env.PORT || 8070;

app.listen(port, () => `Server is up and running on port number: ${port}`);