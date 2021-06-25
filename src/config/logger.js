/* global reqlib */
const appRoot = require('app-root-path');
const { addColors, createLogger, format, transports } = require('winston');
const config = reqlib('/src/config');

const { colorize, combine, timestamp, uncolorize, printf } = format;

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4
};

const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'white'
};

addColors(colors);

// define the custom settings for each transport (file, console)
const transportFileOpts = {
  // filename: './logs/app.log',
  filename: `${appRoot}/logs/app.log`,
  handleExceptions: true,
  json: true,
  maxsize: 5242880, // 5MB
  maxFiles: 5
};

const transportsOpts = [
  new transports.Console(),
  // where to pint error logs
  //   new transports.File(Object.assign({}, transportFileOpts, { filename: './logs/error.log', level: 'error' })),
  new transports.File(Object.assign({}, transportFileOpts, { filename: `${appRoot}/logs/error.log`, level: 'error' })),
  // Allow to print all the error message inside the app.log file
  // (also the error log that are also printed inside the error.log)
  new transports.File(Object.assign({}, transportFileOpts, { colorize: false }))
];

const logger = createLogger({
  // in production, show only info, warn and error messages.
  level: config.isDev ? 'debug' : 'info',
  levels,
  format: combine(
    config.isDev ? colorize({ all: true }) : uncolorize(),
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
    printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
  ),
  transports: transportsOpts,
  exitOnError: false // do not exit on handled exceptions
});

module.exports = logger;
