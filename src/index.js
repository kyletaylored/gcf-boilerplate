const dotenv = require('dotenv')
const express = require('express')
const logger = require('./middleware/logger')

// Inject anything from the .env file into the environment variables
dotenv.config()

// Set up express server and default middleware
const app = express()
app.use(logger)

// Router imports
const router = require('./proxy')
app.use(router)

// Primary entrypoint
exports.app = app