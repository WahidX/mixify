const mongoose = require('mongoose');
const env = require('./environment');

let mongodbUri =
  env.name === 'development'
    ? `mongodb://localhost/${env.db}`
    : `mongodb+srv://droidx:${env.MXFY_DP_PASS}@cluster0.g8vvd.mongodb.net/${env.db}?retryWrites=true&w=majority`;

mongoose.connect(mongodbUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error connecting mongodb'));
db.once('open', function () {
  console.log('Connected to mongoDB');
  console.log(`MONGO: using db: ${env.db}`);
});

module.exports = db;
