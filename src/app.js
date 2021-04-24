global.reqlib = require('app-root-path').require;

const express = require('express');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');

const app = express();
const config = require('./config/init');
const { filesUploadFolder } = require('./config');

//routes
const routes = require('./api/routes');

config.initializeDB();

// enable files upload
app.use(
  fileUpload({
    createParentPath: true
  })
);

app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyParser.json({ limit: '50mb', extended: true }));
app.use(express.static(filesUploadFolder));

app.use(config.cors);

app.use(config.morganMiddleware());

app.use('/api', routes);
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../../www/index.html'));
//   // res.sendFile(path.join(__dirname, '../../katerina-vue/src/index.html'));
// });

module.exports = app;
