const express = require('express')
const bodyParser = require('body-parser')
const linksRouter = require('./routes/links')

// Create new Express app
const app = express()

// Middleware plugins
app.use(bodyParser.json())

// Adding routes
app.use(linksRouter)

// Start the web server!
app.listen(process.env.PORT || 7000, () => {
    console.log('Server started at localhost:7000')
})