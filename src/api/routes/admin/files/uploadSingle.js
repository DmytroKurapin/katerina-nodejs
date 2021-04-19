const path = require('path');
const { filesUploadFolder } = require('../../../../config');
const { getAllowedFileType } = require('../../../../services/helpers');

module.exports = async (req, res) => {
  try {
    if (!req.files) {
      res.status(200).json({ status: 'error', message: 'No file uploaded' });
    } else {
      const fileData = req.files.file;
      const checkedFile = getAllowedFileType(fileData);
      if (checkedFile) {
        const filePath = path.join(`${checkedFile}s`, fileData.name); // convert to images or videos
        await fileData.mv(path.join(filesUploadFolder, filePath));

        return res.status(200).json({ status: 'success', meta: { path: filePath } });
      }
      return res.status(200).json({ status: 'error', message: 'File extension is not permitted' });
    }
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
};
