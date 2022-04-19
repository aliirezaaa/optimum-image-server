module.exports = {
  basePath: process.env.FILE_SERVER_BASE_PATH,
  supportedFormats: ["jpg", "png", "webp"],
  supportedQualities: ["medium", "low", "high", ""],
  qualitiesValue: { low: 20, medium: 50, high: 80 },
};
