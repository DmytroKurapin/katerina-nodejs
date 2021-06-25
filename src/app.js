global.reqlib = require('app-root-path').require;

const express = require('express');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const helmet = require('helmet');

const app = express();
const config = require('./config/init');
const { filesUploadFolder } = require('./config');
const path = require('path');
//routes
const routes = require('./api/routes');
console.log(1)
config.initializeDB();
console.log(2)
app.use(config.morganMiddleware());
console.log(3)
// app.use(helmet()); // todo unccoemnt of https
console.log(4)
app.use(config.cors);

// load admin files
app.use('/files', express.static(path.join(__dirname, '../../dist')));
// enable files upload
app.use(fileUpload({ createParentPath: true  }));
// console.log(path.join(__dirname, '../../dist'))
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyParser.json({ limit: '50mb', extended: true }));
app.use('/be-static', express.static(filesUploadFolder));
console.log(6)
app.use('/api', routes);
// load admin table
app.get('/table', (req, res) => {
// console.log(req);
 res.sendFile(path.join(__dirname, '../../dist/index.html'));  
 });
	 // res.sendFile(path.join(__dirname, '../../katerina-vue/src/index.html'));});
console.log(7)
module.exports = app;
