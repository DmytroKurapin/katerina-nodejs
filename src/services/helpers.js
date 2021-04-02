/**
 * check if file extension is permitted
 * @param {File} file - file data
 * @returns {boolean} - is allowed or not
 */
const checkFileExt = function(file) {
  // Accept images or video only
  return file.name && !!file.name.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF|mp4|MP4|mov|MOV|ogg|OGG)$/);
};
exports.checkFileExt = checkFileExt;
