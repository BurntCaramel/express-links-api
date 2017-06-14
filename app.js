const express = require('express')
const linksRouter = require('./routes/links')

const app = express()

app.use(linksRouter)

app.listen(process.env.PORT || 7000)