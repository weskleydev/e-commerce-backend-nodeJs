
const mongoose = require('mongoose')

// Connecta ao banco
mongoose.connect(connectionString())


function connectionString() {
  if (process.env.NODE_ENV == "production") {
    return `mongodb+srv://${process.env.MONGOUSER}:${process.env.MONGO_ACCESS_KEY}cluster0.0ctut.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
  }
  else {
    return `mongodb://localhost:27017/${process.env.DB_NAME}`;
  }
}
