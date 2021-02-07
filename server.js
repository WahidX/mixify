const express = require('express');
const app = express();
const port = process.env.PORT || 8000;
const cors = require('cors');

// to allow react to hit the apis
// const allowedOrigins = ['http://localhost:3000', 'http://localhost:8000'];
app.use(cors());
// app.use(
//   cors({
//     origin: function (origin, callback) {
//       if (!origin) return callback(null, true);
//       if (allowedOrigins.indexOf(origin) === -1) {
//         var msg =
//           'The CORS policy for this site does not ' +
//           'allow access from the specified Origin.';
//         return callback(new Error(msg), false);
//       }
//       return callback(null, true);
//     },
//   })
// );

// Decode post reqs
app.use(express.urlencoded());

// Router
app.get('/', function (req, res) {
  return res.status(200).json({
    message: 'Server running fine',
  });
});
app.use('/api', require('./apis'));

app.listen(port, function (err) {
  if (err) {
    console.log(`Error while running server: ${err}`);
  }

  console.log(`Server running at ${port}`);
});
