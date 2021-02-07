const express = require('express');
const app = express();
const port = process.env.PORT || 8000;
const cors = require('cors');

app.use(cors());

// Decode post reqs
app.use(express.urlencoded());

// Router
app.use('/api', require('./apis'));

app.listen(port, function (err) {
  if (err) {
    console.log(`Error while running server: ${err}`);
  }

  console.log(`Server running at ${port}`);
});
