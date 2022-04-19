// const imagemin = require("imagemin");
// const imageminJpegtran = require("imagemin-jpegtran");
// const imageminPngquant = require("imagemin-pngquant");
// const imageminMozjpeg = require("imagemin-mozjpeg");
// const imageminWebp = require("imagemin-webp");
var debug = require("debug")("project:server");

const gulp = require("gulp");
const imagemin = require("gulp-imagemin");
const rename = require("gulp-rename");
// const imageminWebp = require("imagemin-webp");
const config = require("../config");
const qualities = config.qualitiesValue;
const formats = { jpg: imagemin.mozjpeg };
// , "jpg", "png", "webp"];
module.exports = {
  optimize: (
    imagePath,
    destinationPath,
    format = "jpg",
    quality = "medium"
  ) => {
    return new Promise((resolve, reject) => {
      var start = new Date();
      try {
        let qt;
        let suffix;
        let imgFormatFunction = "";
        if (Object.keys(qualities).indexOf(quality) != -1) {
          if (format == "webp") {
            qt = qualities["high"];
            suffix = "";
          } else {
            qt = qualities[quality];
            suffix = "-" + quality;
          }
        } else {
          reject("quality not support");
        }

        if (Object.keys(formats).indexOf(format) == -1) {
          reject("format not support");
        }
        imgFormatFunction = formats[format];
        debug(imagePath);
        debug(destinationPath);

        let task = gulp
          .src(imagePath, { allowEmpty: true })
          .pipe(imagemin([imgFormatFunction({ quality: qt })]))
          .pipe(rename({ suffix: suffix, extname: "." + format }))
          .pipe(gulp.dest(destinationPath, { allowEmpty: true }));
        task.on("end", function () {
          debug("all");
          resolve("image optimized ");
        });
        var end = new Date() - start;
        debug("Execution time: %dms", end);
      } catch (err) {
        debug(err);
        reject("convertor error");
      }
    });
  },

  shouldImageConvert: async (
    preferQuality,
    filePath,
    imageName,
    quality,
    imageFormat
  ) => {
    const qualities = config.supportedQualities;
    let needConvert = false;
    let qt = "high";

    if (!quality && imageFormat) {
      needConvert = true;
      qt = "medium";
      debug(1);
    }
    if (!quality && imageFormat && preferQuality) {
      needConvert = true;
      qt = preferQuality;
      debug(2);
    }
    if (quality && imageFormat && quality == "-" + preferQuality) {
      needConvert = false;
      debug(3);
    }
    if (quality && imageFormat && quality != "-" + preferQuality) {
      needConvert = true;
      qt = preferQuality;
      debug(4);
    }
    if (preferQuality && qualities.indexOf(preferQuality) == -1) {
      needConvert = false;
      debug(5);
    }

    return [needConvert, qt];
  },
  prioritizeListByItem: (type, item) => {
    const formats = config.supportedFormats;
    const qualities = config.supportedQualities;
    let list;
    switch (type) {
      case "format":
        list = formats;
        break;
      case "quality":
        list = qualities;
        break;
    }

    let tempList = [...list];
    const pfIndex = tempList.indexOf(item);

    if (pfIndex != -1) {
      const temp = tempList[pfIndex];
      tempList.splice(pfIndex, 1);
      tempList.unshift(temp);
    }
    return tempList;
  },
};
