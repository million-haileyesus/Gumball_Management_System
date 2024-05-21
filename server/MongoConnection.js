const mongoose = require('mongoose');

let connection;

const connect = () => {
  if (connection) {
    return Promise.resolve(connection);
  }

  const mongoURI = 'mongodb://0.0.0.0:27017/gundams';

  return mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(conn => {
      connection = conn;
      console.log('MongoDB connected');
      return connection;
    })
    .catch(err => {
      console.error('Could not connect to MongoDB:', err.message);
      throw err; // Propagate the error to the calling code
    });
};

module.exports = { connect };
