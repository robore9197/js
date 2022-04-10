const express = require('express')
const path = require('path')
const morgan = require('morgan')
const {engine} = require('express-handlebars')
const res = require('express/lib/response')
const app = express()
const port = 3000

const route = require('./routes')
const db = require('./config/db')

//connect to db
db.connect()

app.use(express.static(path.join(__dirname, 'public')))

app.use(express.urlencoded({
  extended: true
}))
app.use(express.json())

//http logger
app.use(morgan('combined'))

//template engine
app.engine('.hbs', engine({extname: '.hbs'}));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'resources', 'views'))

// console.log('PATH: ', path.join(__dirname, 'resources/views'))

route(app)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})