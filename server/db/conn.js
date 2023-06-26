const mongoose = require('mongoose');

const URI = process.env.DATABASE;

mongoose.connect(URI);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error' ));
db.once('open', function callback () {
  console.log("Database connected successfully")
});