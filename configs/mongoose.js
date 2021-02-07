const mongoose = require('mongoose');
const env = require('./environment');

mongoose.connect(
  `mongodb+srv://droidx:dV9pdoogCVkEYYTl@cluster0.g8vvd.mongodb.net/${env.db}?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error connecting mongodb'));
db.once('open', function () {
  console.log('Connected to mongoDB');
  console.log(`MONGO: using db: ${env.db}`);
});

module.exports = db;

// dV9pdoogCVkEYYTl
