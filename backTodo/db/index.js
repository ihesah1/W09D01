const mongoose = require('mongoose')
require('dotenv').config()
const DB = process.env.DB;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose.connect(`mongodb://localhost:27017/${DB}`, options).then(() => {
  console.log("DB is connected!");
});