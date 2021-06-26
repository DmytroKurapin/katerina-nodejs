/* global reqlib */
const mongoose = require('mongoose');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const { mongoUrl, isDev } = reqlib('/src/config');
const logger = reqlib('/src/config/logger');

module.exports = {
  initializeDB: async () => {
    await mongoose.connect(mongoUrl, { useNewUrlParser: true, useFindAndModify: false });

    mongoose.connection.on('connected', function () {
      logger.info('Mongoose default connection open');
    });

    mongoose.connection.on('error', function (err) {
      logger.error('Mongoose default connection error: ' + err);
    });

    mongoose.connection.on('disconnected', function () {
      logger.error('Mongoose default connection disconnected');
    });

    process.on('SIGINT', function () {
      mongoose.connection.close(function () {
        logger.info('Mongoose default connection disconnected through app termination');
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
  },

  morganMiddleware: () => {
    // Override the stream method by telling
    // Morgan to use our custom logger instead of the console.log.
    const stream = {
      // Use the http severity
      write: message => logger.http(message)
    };

    // Skip all the Morgan http log if the
    // application is not running in development mode.
    // This method is not really needed here since
    // we already told to the logger that it should print
    // only warning and error messages in production.
    const skip = () => !isDev;

    // Build the morgan middleware
    return morgan(
      // Define message format string (this is the default one).
      // The message format is made from tokens, and each token is
      // defined inside the Morgan library.
      // You can create your custom token to show what do you want from a request.
      ':method :url :status :res[content-length] - :response-time ms',
      // Options: in this case, I overwrote the stream and the skip logic.
      // See the methods above.
      { stream, skip }
    );
  },

  requestsLimiter: rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // limit each IP to 5 requests per windowMs
    message: { status: 'error', message: 'Too Many Requests' }
  })
};
