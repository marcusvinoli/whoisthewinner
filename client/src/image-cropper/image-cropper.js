function buildImageCropper({CropParameters, CropEngine}) {
    return async function CropImage(inputFile, outputFile){
        var CropPar = CropParameters.getParameters(inputFile);
        await CropEngine.crop(inputFile, CropPar, outputFile);
    }
};

module.exports = buildImageCropper;