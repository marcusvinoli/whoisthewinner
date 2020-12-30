const Tesseract = require('node-tesseract-ocr');

const buildImageToTextConverter = require('./image-to-text');

TesseractEngine = {
    defaultConfiguration : {
        lang: "eng+por",
        oem: 1,
        psm: 3,
    },

    setConfig(configuration) {
        this.defaultConfiguration = configuration;
    },

    async convert(inputImagePath) {
        var textResult = await Tesseract.recognize(inputImagePath, this.defaultConfiguration)
        .then(text => {
            return text;
        })
        .catch(error => {
            throw new Error("Oops! Something went wrong...: " + error);
        })
        return textResult;
    }
};

const ImageToText = buildImageToTextConverter(TesseractEngine);

module.exports = ImageToText;