/**
 * check if file extension is permitted and what if the file type
 * @param {File} file - file data
 * @returns {'image' | 'video' | null} - what is the file type or null if not acceptable
 */
const getAllowedFileType = function(file) {
  // Accept images or video only
  if (!file.name) {
    return null;
  } else if (file.name.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
    return 'image';
  } else if (file.name.match(/\.(mp4|MP4|mov|MOV|ogg|OGG)$/)) {
    return 'video';
  }
  return null;
};

const generateVendorCode = (vendorPrefix, lastVendor, vendorStartNumber) => {
  const lastNumber = !lastVendor ? vendorStartNumber : Number(lastVendor.replace(vendorPrefix, ''));
  return `${vendorPrefix}${lastNumber + 1}`;
};

exports.getAllowedFileType = getAllowedFileType;
exports.generateVendorCode = generateVendorCode;
