require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` });
module.exports = {
  endpoint: process.env.API_URL,
  masterKey: process.env.API_KEY,
  port: process.env.PORT,
  mongoUrl: process.env.MONGO_URL,
  filesUploadFolder: process.env.FILES_UPLOAD_FOLDER,
  isDev: process.env.NODE_ENV === 'development',
  allowedIps: process.env.ALLOWED_IPS.split(' ')
};
