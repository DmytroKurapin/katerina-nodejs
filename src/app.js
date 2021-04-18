const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const config = require('./config/init');
const { filesUploadFolder } = require('./config');
const fileUpload = require('express-fileupload');

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

app.use('/api', routes);
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../../www/index.html'));
//   // res.sendFile(path.join(__dirname, '../../katerina-vue/src/index.html'));
// });

module.exports = app;
