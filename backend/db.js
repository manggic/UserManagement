




const mongoose = require('mongoose')
const connection  = () => mongoose.connect(process.env.MONGO_URL)
      .then(()=> console.log('db is connected')).catch(err => console.log('db error', err));

module.exports =  connection