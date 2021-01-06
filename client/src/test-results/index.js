const ImageToText = require('../image-to-text');
const ImageCropper = require('../image-cropper');
const PathComposer = require('../path-composer');
const buildImageCropper = require('../image-cropper/image-cropper');
const buildVotersGetter = require('./test-results');
var stringSimilarity = require('string-similarity');
 

class TestResults {
    constructor() {
        this.Voters = [];
    }

    //Remove unimportant information of screen
    sanitizeInputScreenshot(inputScreenshotPath) {
        //Creation of output path
        var sanitizedScreenshotPath = PathComposer.getJoinedFileNamePath(inputScreenshotPath, '-output');
        //Crop image
        ImageCropper.crop(inputScreenshotPath, sanitizedScreenshotPath);
        //Return the output path of sanitized screenshot
        return sanitizedScreenshotPath;
    };

    //Remove Special Characteres
    getStringWithoutSpecialChars(str) {
        //return str.replace(/[`~!@#$%^&*()|+\-=?;:'",<>\{\}\[\]\\\/]/gi, '');
        return str.replace(/[^\w\s\r]/gi, '');
        return str.replace(/[^\w\r\n\t\ .]/gim, '');
    };

    //Create a multiple line strings array from single string
    getLinesArrayFromString(str) {
        return str.split('\n');
    };

    isEmpty(str) {
        return (!str || 0 === str.length);
    };

    isBlank(str) {
        return (!str || /^\s*$/.test(str) || str === "");
    };

    //Remove void lines
    getArrayWithNoVoidLines(textArray) {
        for (var i = 0; i < textArray.length; i++){
            if(this.isBlank(textArray[i]) || this.isEmpty(textArray[i])){
                textArray.splice(i, 1);
            }
        }
        return textArray;
    }

    //Remove Dead Text 
    getArrayWithNoDeadText(textArray) {
        let textToRemove = 'respondeu ' + textArray[0];
        let textToCompare = textToRemove;
        textToRemove = textToRemove.trim();

        for(var i = 0; i < textArray.length; i=i+2) {
            if(!textArray[i]){
                textArray.splice(i, 1);
            }
        }

        let firstWordOfRmvString = textToRemove.split(' ')[0];
        let lastWordOfRmvString = textToRemove.split(' ')[(textToRemove.split(' ').length-1)];

        textArray.splice(0, 1);
        
        for (var i = 0; i < textArray.length; i++) {
            textArray[i] = textArray[i].trim();
            if(textArray[i].search(firstWordOfRmvString) > -1) {
                textArray[i] = textArray[i].split(firstWordOfRmvString)[0];
                if((i+1 < textArray.length) && ((textArray[i+1].search(lastWordOfRmvString) > -1) || (stringSimilarity.compareTwoStrings(lastWordOfRmvString, textArray[i+1]) >= 0.8))) {
                    textArray.splice(i+1,1);
                }
            }
            if(stringSimilarity.compareTwoStrings(textToCompare, textArray[i]) > 0.85) {
                textArray.splice(i+1,1);
            }
        }
        
        for (var i = 0; i < textArray.length; i++) {
            textArray[i] = textArray[i].trim();
        }

        for(var i = 0; i <= textArray.length; i=i+2) {
            if(!textArray[i]){
                textArray.splice(i, 1);
            }
        }

        return textArray;
    }

    //Remove dead text from output text form OCR
    sanitizeOutputText(text) {
        var stringText = text.toString();
        stringText = this.getStringWithoutSpecialChars(stringText);
        
        var stringArray = this.getLinesArrayFromString(stringText);
        stringArray = this.getArrayWithNoVoidLines(stringArray);
        stringArray = this.getArrayWithNoDeadText(stringArray);
        return stringArray;
    };

    createVotersArray(votersUsersAndNames) {
        for(var i = 0; i <= votersUsersAndNames.length-1; i+=2) {
            this.Voters.push({
                username : votersUsersAndNames[i],
                name : votersUsersAndNames[i+1],
            });
        }
    };

    printVoterOnConsoleLog() {
        console.log("Printing results... ");
        for(var i = 0; i <= Voters.length -1; i++) {
            console.log('@' + Voters[i].username + ' (' + Voters[i].name + ')');
        }
    };

    async getVoters(inputScreenshotPath) {
        try {
            await ImageToText.convert(this.sanitizeInputScreenshot(inputScreenshotPath)).then(text => {
                this.createVotersArray(this.sanitizeOutputText(text));
            });
            return this.Voters
        } catch (error) {
            console.log("Error! " + error);
            throw error;
        }
    }
};

module.exports = TestResults;
