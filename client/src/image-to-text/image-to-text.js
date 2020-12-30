function buildImageToTextConverter(ocrEngine) {
    return ImageToText = {
        engine : ocrEngine,

        convert(inputPath) {
            return this.engine.convert(inputPath);
        },

        setConfig(configuration) {
            this.ocrEngineInstance.defaultConfiguration = configuration;
        },
    };
};

module.exports = buildImageToTextConverter;