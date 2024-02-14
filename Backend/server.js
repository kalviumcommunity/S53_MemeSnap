const express = require('express')
const app = express()
const port = process.env.PORT || 3000;
const memeData = require("./data/database")

const { ConnectToDB, stopDatabase, isConnected } = require('./db');

app.use(express.json());

app.get('/data', (req, res) => {
  res.send(memeData);
})

app.get('/home', async (req, res) => {
  const dbStatus = isConnected() ? 'disconnected' : 'connected';
  res.send({
    message: 'o_O',
    database: dbStatus,
  });
});

if (require.main === module) {
  app.listen(port, () => {
    console.log(`🚀 server running on PORT: ${port} http://localhost:${port}/`);
    ConnectToDB()
  });
}

module.exports = app;