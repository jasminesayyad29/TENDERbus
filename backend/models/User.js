const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true 
      },
      email:{
        type: String,
        required: true
      },
      password: {
        type: String,  
        required: true 
      },
      role:{
        type: String,
        required: true
      },
      phone: {
        type: Number,
      }
})

const usermodel = mongoose.model("users", UserSchema)

module.exports = usermodel