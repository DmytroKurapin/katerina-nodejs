const http = require('http');
const app = require('./app');
const { port } = require('./config');
const logger = require('./config/logger');

console.log('~~~~~', port)

const server = http.createServer(app);
console.log(123)
server.on('error', function (e) { console.log(e);})
server.listen(port, (err) => {
  console.log(err)
	console.log(`Server is up and running on port: ${port}`);
});
