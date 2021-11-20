import { Promise, connect, set } from 'mongoose'
Promise = global.Promise

set('useNewUrlParser', true);
set('useFindAndModify', false);
set('useCreateIndex', true);
set('useUnifiedTopology', true);

connect(connectionString, { useNewUrlParser: true }).then(() => console.log('Connection Succesfull')).catch(err => console.error(err));
connectionString = () => {
  if (process.env.NODE_ENV == "production") {
    return `mongodb+srv://${process.env.MONGOUSER}:${process.env.MONGO_ACCESS_KEY}cluster0.0ctut.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
  }
  else {
    return `mongodb://localhost:27017/${process.env.DB_NAME}`;
  }
}


