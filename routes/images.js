const express = require("express");
const optimizer = require("../util/optimizer");
const config = require("../config");
const router = express.Router();

var debug = require("debug")("project:server");
const fileHandler = require("../util/fileHandler");
/* GET images. */
const basePath = config.basePath;

router.get("/:folder/:scope/:image", async function (req, res) {
  try {
    let imageName;
    let imageFormat;
    let quality;
    const params = req.params;
    const preferQuality = req.query.preferQuality;
    const preferFormat = req.query.preferFormat;
    //split image name and format
    imageName = fileHandler.selectFileName(params.image);
    //
    const filePath = basePath + `/${params.folder}` + `/${params.scope}`;

    debug("pf", preferFormat);
    debug("pq", preferQuality);
    let prioritizedFormats = optimizer.prioritizeListByItem(
      "format",
      preferFormat
    );
    let prioritizedQualities = optimizer.prioritizeListByItem(
      "quality",
      preferQuality
    );
    debug(prioritizedFormats);
    debug(prioritizedQualities);

    [imageFormat, quality] = await fileHandler.selectFile(
      preferFormat,
      preferQuality,
      filePath,
      imageName,
      prioritizedFormats,
      prioritizedQualities
    );
    let [needConvert, qt] = await optimizer.shouldImageConvert(
      preferQuality,
      filePath,
      imageName,
      quality,
      imageFormat
    );
    debug(needConvert);
    if (needConvert) {
      await optimizer.optimize(
        filePath + "/" + imageName + ".png",
        basePath + "/images/" + params.scope,
        "jpg",
        qt
      );
      debug("yehoooo");
      [imageFormat, quality] = await fileHandler.selectFile(
        preferFormat,
        preferQuality,
        filePath,
        imageName,
        prioritizedFormats,
        prioritizedQualities
      );
    }
    debug("format found ", imageFormat);
    debug("qt found ", quality);
    if (!imageFormat) {
      res.status(404).end();
      return;
    }
    debug("if", imageFormat);
    res.sendFile(filePath + `/${imageName}` + `${quality}` + `.${imageFormat}`);
  } catch (err) {
    debug(err);

    res.status(404).end();
    return;
  }
});

router.post("/optimizeImage", async function (req, res) {
  try {
    const body = req.body;
    debug(req.body);
    const { imagePath, destPath, format, quality } = body;

    const slashIndex = imagePath.lastIndexOf("/");

    let image = imagePath.slice(slashIndex + 1);
    let imageDir = imagePath.slice(0, slashIndex + 1);
    image = image.split(".");
    debug(image);
    debug(imageDir);
    if (
      !imagePath ||
      !(await fileHandler.isFileExists(
        basePath + imageDir + image[0],
        image[1]
      )) ||
      (await fileHandler.isFileExists(
        destPath + imageDir + image[0] + "-" + quality,
        format
      ))
    ) {
      res.status(400).end();
      return;
    }
    let qualityList = [];
    if (quality == "all") {
      qualityList = ["high", "medium", "low"];
    } else {
      qualityList.push(quality);
    }
    for (let qt of qualityList) {
      optimizer
        .optimize(
          basePath + imageDir + image[0] + "." + image[1],
          basePath + destPath,
          format,
          qt
        )
        .then((info) => {
          debug(info);
        })
        .catch((err) => {
          debug(err);
        });
    }

    res.send("ok");
    return;
  } catch (err) {
    debug(err);
    res.status(400).end();
  }
});

module.exports = router;
