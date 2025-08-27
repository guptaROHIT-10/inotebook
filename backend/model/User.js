const mongoose = require('mongoose');
const { Schema } = mongoose;

//A Schema in Mongoose is like a blueprint for a MongoDB collection.
const userSchema = new Schema({
  name:{
   type: String,
   require: true,
  },
  email:{
   type: String,
   require: true,
   // unique: true 
  },
  password:{
   type: String,
   require: true,
  },
  date:{
   type: Date,
   default: Date.now,
  },
});

module.exports = mongoose.model('user', userSchema);