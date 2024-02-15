const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
require('dotenv').config();

const { ConnectToDB, stopDatabase, isConnected } = require('./db');
const route = require('./routes/route');

app.use(express.json());

// Use the route middleware
app.use('/', route);

// Route to check database connection status
app.get('/status', (req, res) => {
  res.send({ database: isConnected() ? 'connected' : 'disconnected' });
});

// Start the server
if (require.main === module) {
  ConnectToDB()
    .then(() => {
      app.listen(port, () => {
        console.log(`Server is running on PORT: ${port}`);
      });
    })
    .catch(error => {
      console.error('Error connecting to the database:', error);
    });
}

// Gracefully stop the database connection on process termination
process.on('SIGINT', async () => {
  try {
    await stopDatabase();
    console.log('Database connection closed.');
    process.exit(0);
  } catch (error) {
    console.error('Error stopping the database:', error);
    process.exit(1);
  }
});

module.exports = app;
