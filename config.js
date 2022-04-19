module.exports = {
  basePath: process.env.IMAGES_DIRECTORY,
  supportedFormats: ["jpg", "png", "webp"],
  supportedQualities: ["medium", "low", "high", ""],
  qualitiesValue: { low: 20, medium: 50, high: 80 },
};
