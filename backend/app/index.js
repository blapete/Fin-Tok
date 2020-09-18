const path = require('path')
const express = require('express')
const cors = require("cors");
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
// const morgan = require("morgan");
const accountRouter = require('../app/api/account')
const yahooRouter = require('../app/api/yahoo')
const accountStocksRouter = require('../app/api/accountStocks')
// const db = require("./database/models");

const app = express()

//middleware
// app.use(morgan("dev"));
app.use(cookieParser())
app.use(express.json())
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
if (process.env.NODE_ENV === 'production') {
	app.use(express.static(path.join(__dirname, '../../frontend/build')))
} else {
	app.use(express.static(path.join(__dirname, '../../frontend/public')))
}

//api routes
app.use('/account', accountRouter)
app.use('/stock', yahooRouter)
app.use('/fav', accountStocksRouter)

//error handler
app.use((err, req, res, next) => {
	const statusCode = err.statusCode || 500
	res.status(statusCode).json({
		type: 'error',
		message: err.message,
	})
})

//fallback
app.get('*', (req, res) => {
	if (process.env.NODE_ENV === 'production') {
		res.sendFile(path.resolve(__dirname, '../../frontend/build/index.html'))
	} else {
		res.sendFile(path.resolve(__dirname, '../../frontend/public/index.html'))
	}
})

module.exports = app
