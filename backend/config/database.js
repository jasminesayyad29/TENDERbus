require("dotenv").config();
const mongoose = require("mongoose") ;

const connectDB = () => {
    mongoose.connect(process.env.MONGODB_URL , {})
    .then( () => {
        console.log("DB Connected successfully") 
    })
    .catch( (error) => {
        console.log("DB connected Issue") ;
        console.error(error) ;
        process.exit(1) ;
    }) ;
}

module.exports = connectDB ;