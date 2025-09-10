const mongoose = require('mongoose');

//create a function for connecting to the mongodb serve
function connectDB() {

//add variable form .env file 
 mongoose.connect(process.env.MONGODB_URL)
    
.then(()=>{
        console.log('Mongodb Database connected');
    })
    .catch((err)=>{
        console.log('Database connection error:', err);
    })
}
module.exports = connectDB;