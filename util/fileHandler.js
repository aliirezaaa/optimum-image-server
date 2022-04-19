//const formats = ["jpeg", "jpg", "png", "webp"];
//const qualities = ["low", "medium", "high"];
var debug = require("debug")("project:server");
var fs = require("fs");
module.exports = {
  selectImageFormat: async (filePath, formats, qualities) => {
    let format = null;
    let quality = null;
    let find = false;
    for (quality of qualities) {
      if (quality != "") quality = "-" + quality;
      for (format of formats) {
        debug(format);
        debug(quality);
        try {
          await fs.promises.access(
            filePath + `${quality}` + `.${format}`,
            fs.constants.F_OK
          );
          debug("find ", format);
          debug("find ", quality);
          find = true;
          return [format, quality];
        } catch (err) {
          find = false;
          continue;
        }
      }
    }
    if (find) {
      return [format, quality];
    } else {
      return [null, null];
    }
  },
  isFileExists: async (filePath, fileFormat) => {
    try {
      debug(filePath + `.${fileFormat}`, fs.constants.F_OK);
      await fs.promises.access(filePath + `.${fileFormat}`, fs.constants.F_OK);
      debug("file exists");
      return true;
    } catch (err) {
      debug(err);
      return false;
    }
  },
  selectFile: async (
    imageFormat,
    quality,
    filePath,
    imageName,
    prioritizedFormats,
    prioritizedQualities
  ) => {
    return await module.exports.selectImageFormat(
      filePath + `/${imageName}`,
      prioritizedFormats,
      prioritizedQualities
    );
  },
  selectFileName: (img) => {
    const image = img.split(".");
    let name;
    if (image.length == 1) {
      name = image[0];
    } else if (image.length == 2) {
      name = image[0].replace(" ", "");
    }
    return name;
  },
  //   try {
  //     await fs.promises.access(filePath + `.${imageFormat}`, fs.constants.F_OK);
  //     return imageFormat;
  //   } catch (err) {
  //     debug("image not ", err);
  //   }
};
