const jwt = require("jsonwebtoken");
// [SECTION] Environment Setup
// import our .env for environment variables
require('dotenv').config();

module.exports.createAccessToken = (user) => {
	const data = {
		id : user._id,
		email : user.email,
	}

	return jwt.sign(data, process.env.JWT_SECRET_KEY, {});
}

module.exports.errorHandler = (err, req, res, next) => {
	// Log the error
	console.error(err);

	const statusCode = err.status || 500;
	// if the error object contains a message property, we use it as the error message; otherwise, we default to 'Internal Server Error'.
	const errorMessage = err.message || 'Internal Server Error';

	res.status(statusCode).json({
		error: {
			message: errorMessage,
			errorCode: err.code || 'SERVER_ERROR',
			details: err.details || null
		}
	})
}

// [SECTION] Middleware to check if the user is authenticated
module.exports.isLoggedIn = (req, res, next) => {
	if(req.user){
		next()
	}else {
		res.sendStatus(401);
	}
}