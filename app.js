const express = require('express')
const bodyParser = require('body-parser')
const linksRouter = require('./routes/links')

// New web server app
const app = express()

// Middleware plugins
app.use(bodyParser.json())

// Routes
app.use(linksRouter)

// Start the web server!
app.listen(process.env.PORT || 7000)