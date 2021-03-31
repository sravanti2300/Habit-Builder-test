const mongoose = require('mongoose');
// connecting to mongoose
// add your mongodb
mongoose.connect('mongodb://localhost:27017/WhenBusDB');
// mongoose database connection
const db = mongoose.connection;
db.on('error',console.error.bind(console,"Error connecting to MongoDb"));

db.once('open',function(){
    console.log('Connected to Database :: MondoDB');
});

module.exports=db;
