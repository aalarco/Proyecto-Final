require('dotenv').config();

const express = require('express')
const app = express()

require('./configs/debugger.config')
require('./configs/locals.config')(app)
require('./configs/middlewares.config')(app)
require('./configs/mongoose.config')
require('./configs/session.config')(app)
require('./configs/view-engine.config')(app)


app.use('/', require('./routes/auth.routes'))
app.use('/movies', require('./routes/movies.routes'))

module.exports = app