const http = require('http');
const app = require('./app');
const { port } = require('./config');
const logger = require('./config/logger');

const server = http.createServer(app);

server.on('error', function (e) {
  logger.error('server.js on error: ' + e.message);
});

server.listen(port, () => {
  logger.info(`Server is up and running on port: ${port}`);
});
