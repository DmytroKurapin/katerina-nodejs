const mongoose = require('mongoose');
const { mongoUrl } = require('../config');

module.exports = {
  initializeDB: async () => {
    mongoose.connect(mongoUrl, { useNewUrlParser: true, useFindAndModify: false });

    mongoose.connection.on('connected', function () {
      console.log('Mongoose default connection open');
    });

    mongoose.connection.on('error', function (err) {
      console.log('Mongoose default connection error: ' + err);
    });

    mongoose.connection.on('disconnected', function () {
      console.log('Mongoose default connection disconnected');
    });

    process.on('SIGINT', function () {
      mongoose.connection.close(function () {
        console.log('Mongoose default connection disconnected through app termination');
        process.exit(0);
      });
    });

    mongoose.Promise = global.Promise;
  },

  cors: async (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
      return res.status(200).json({});
    }
    next();
  }
};
