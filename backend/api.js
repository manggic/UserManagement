const express = require('express')
const app = express()
const port = 3001
var bodyParser = require('body-parser')
const connection = require('./db')
const User = require('./schema/User')
const { v4: uuidv4 } = require('uuid');


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
    let dataToSend = { ...req.body , id:uuidv4() }
    console.log('req.body?', dataToSend)

    try {
        const users = await User.create(dataToSend)
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
        let users = await User.find({})

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


  app.put('/update/:id',jsonParser, async (req, res) => {
    console.log('id', req.params)

    const {id} = req.params
    console.log('req.body', req.body)
    try {
        const users = await User.findOneAndUpdate({_id:id }, { $set :{...req.body } }, {new: true})
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