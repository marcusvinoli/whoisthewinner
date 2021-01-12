const Clipper = require('image-clipper');
const Canvas = require('canvas');
const ImageSize = require('image-size');

const buildImageCropper = require('./image-cropper');

const defaultWidth = 540; //px

CropParameters = {
    cropStartPoint : {
        x : 95,
        y : 75,
    },

    cropSize : {
        width : null,
        height : null,
    },
    
    getCropSize(inputFile) {
        var imageSize = ImageSize(inputFile);

        if(imageSize.width > defaultWidth) {
            var ratio = defaultWidth / imageSize.width;
            imageSize.width = defaultWidth;
            imageSize.height = imageSize.height * ratio;
        }

        var resultCropSize = {
            width : imageSize.width,
            height : imageSize.height,
        };
        
        console.log("Old Image dimension: " + resultCropSize.height + " x " + resultCropSize.width);
        
        //Computation of Height
        resultCropSize.height = resultCropSize.height - 17; //Bottom cut
        resultCropSize.height = resultCropSize.height - this.cropStartPoint.y;

        //Computation of Width
        resultCropSize.width = resultCropSize.width - 120; //Left cut
        resultCropSize.width = resultCropSize.width - this.cropStartPoint.x;

        console.log("New Image dimension: " + resultCropSize.height + " x " + resultCropSize.width);
        return resultCropSize;
    },

    getParameters(inputFile) {
        this.cropSize = this.getCropSize(inputFile);
        resultObject = {
            cropStartPoint : {
                x : this.cropStartPoint.x,
                y : this.cropStartPoint.y,
            },
            cropSize : {
                width : this.cropSize.width,
                height : this.cropSize.height,
            }
        }
        return (resultObject);
    },
}

CropEngine = {
    crop(inputFile, parameters, outputFile) {
        var clipper = Clipper();
        clipper.injectNodeCanvas(Canvas);
        clipper.image(inputFile, function(){
            console.log('Image loaded successfuly!');
            this.resize(defaultWidth)
            .quality(100)
            .crop(parameters.cropStartPoint.x, parameters.cropStartPoint.y, parameters.cropSize.width, parameters.cropSize.height)
            .toFile(outputFile, function(){ 
                console.log("Cropped image saved!: " + outputFile);
            });
        });
    }
}

const crop = buildImageCropper({CropParameters, CropEngine})

ImageCropper = {
    crop,
}

module.exports = ImageCropper;