const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const config = require('./config/init');
const path = require('path');

//routes
const routes = require('./api/routes');

config.initializeDB();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(config.cors);

app.use('/api', routes);
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../../www/index.html'));
//   // res.sendFile(path.join(__dirname, '../../katerina-vue/src/index.html'));
// });

module.exports = app;
