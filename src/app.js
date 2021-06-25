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

config.initializeDB();

app.use(config.morganMiddleware());
app.use(helmet()); // todo unccoemnt of https
app.use(config.cors);

// load admin files
app.use('/files', express.static(path.join(__dirname, '../../dist')));
// enable files upload
app.use(fileUpload({ createParentPath: true }));

app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyParser.json({ limit: '50mb', extended: true }));
app.use('/be-static', express.static(filesUploadFolder));

app.use('/api', routes);
// load admin table
app.get('/table', (req, res) => {
  // console.log(req);
  res.sendFile(path.join(__dirname, '../../dist/index.html'));
});

module.exports = app;
