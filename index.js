const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
// const session = require('express-session');
const workoutRoutes = require("./routes/workout.js");
const userRoutes = require("./routes/user.js");

require('dotenv').config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

const corsOptions = {
	origin: ['http://localhost:8000','http://localhost:4000', 'http://localhost:3000'],
	credentials: true,
	optionsSuccessStatus: 200
}

app.use(cors(corsOptions));

// app.use(session({
// 	secret: process.env.clientSecret,
// 	resave: false,
// 	saveUninitialized: false
// }))


mongoose.connect(process.env.MONGODB_STRING, {
});

mongoose.connection.once('open', () => console.log('Now Connected to MongoDB Atlas.'))

app.use("/workouts", workoutRoutes);
app.use("/users", userRoutes);

if(require.main === module){
	app.listen(process.env.PORT || 4000, () => {
	    console.log(`API is now online on port ${ process.env.PORT || 4000 }`)
	});
}

module.exports = {app, mongoose};
