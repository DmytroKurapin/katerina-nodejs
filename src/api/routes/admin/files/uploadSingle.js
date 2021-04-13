const path = require('path');
const { filesUploadFolder } = require('../../../../config');
const { checkFileExt } = require('../../../../services/helpers');

module.exports = async (req, res) => {
  try {
    if (!req.files) {
      res.status(200).json({ status: 'error', message: 'No file uploaded' });
    } else {
      const fileData = req.files.file;
      if (checkFileExt(fileData)) {
        const filePath = path.join('images', fileData.name);
        await fileData.mv(path.join(filesUploadFolder, filePath));

        return res.status(200).json({ status: 'success', meta: { path: fileData } });
      }
      return res.status(200).json({ status: 'error', message: 'File extension is not permitted' });
    }
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
};
