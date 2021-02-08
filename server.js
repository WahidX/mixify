const express = require('express');
const app = express();
const port = process.env.PORT || 8000;
const db = require('./configs/mongoose');

const cors = require('cors');
app.use(cors());

// var allowedDomains = [
//   'http://localhost:8000',
//   'http://localhost:3000',
//   'https://accounts.spotify.com',
// ];
// app.use(
//   cors({
//     origin: function (origin, callback) {
//       console.log('origin: ', origin);
//       // bypass the requests with no origin (like curl requests, mobile apps, etc )
//       if (!origin) return callback(null, true);

//       if (allowedDomains.indexOf(origin) === -1) {
//         var msg = `This site ${origin} does not have an access. Only specific domains are allowed to access it.`;
//         return callback(new Error(msg), false);
//       }
//       return callback(null, true);
//     },
//   })
// );

// Decode post reqs
// app.use(express.urlencoded());
app.use(express.urlencoded({ extended: false }));

// Router
app.use('/api', require('./apis'));

app.listen(port, function (err) {
  if (err) {
    console.log(`Error while running server: ${err}`);
  }

  console.log(`Server running at ${port}`);
});
