if (process.env.NODE_ENV == "production") {
  module.exports = {
    connectionString: `mongodb+srv://${process.env.MONGOUSER}:${process.env.MONGO_ACCESS_KEY}cluster0.0ctut.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
  }
}
else {
  module.exports = {
    connectionString: `mongodb://localhost:27017/${process.env.DB_NAME}`

  }
}

