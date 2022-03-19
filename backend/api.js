const express = require('express')
const app = express()
const port = 3000
var bodyParser = require('body-parser')
const connection = require('./db')
const User = require('./schema/User')


// create application/json parser
var jsonParser = bodyParser.json()
var cors = require('cors')
app.use(cors())
require('dotenv').config()


connection()


// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.get('/', jsonParser,(req, res) => {
  res.status(200).json({success: true , data:'Hello World!'})
})

// add
app.post('/add',jsonParser, async (req, res) => {
    console.log(req.body)
    try {
        const users = await User.create(req.body)
        console.log('user', users)
        res.status(200).json({success: true, data: users})
    } catch (error) {
        console.log('error', error)
        res.status(200).json({success: false, data: []})   
    }
  })
  

  // get All
  app.get('/getAll',jsonParser, async (req, res) => {
    console.log(req.body)
    try {
        const users = await User.find({})
        console.log('user', users)
        res.status(200).json({success: true, data: users})
    } catch (error) {
        console.log('error', error)
        res.status(200).json({success: false, data: []})   
    }
  })

  // delete One
  app.delete('/delete/:id',jsonParser, async (req, res) => {
    console.log('id', req.params)

    const {id} = req.params
    try {
        const users = await User.deleteOne({_id:id})
        console.log('user', users)
        res.status(200).json({success: true, data: users})
    } catch (error) {
        console.log('error', error)
        res.status(200).json({success: false, data: []})   
    }
  })



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})