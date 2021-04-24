const http = require('http');
const app = require('./app');
const { port } = require('./config');
const logger = require('./config/logger');

const server = http.createServer(app);

server.listen(port, () => {
  logger.debug(`Server is up and running @ http://localhost:${port}`);
});
