const mongoose = require("mongoose") ;

require("dotenv").config() ;

exports.connect = () => {
    mongoose.connect(process.env.MONGODB_URL , {
    })
    .then( () => {
        console.log("DB Connected successfully") 
    })
    .catch( (error) => {
        console.log("DB connected Issue") ;
        console.error(error) ;
        process.exit(1) ;
    }) ;
}