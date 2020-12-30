const ImageToText = require('../image-to-text');
const ImageCropper = require('../image-cropper');
const PathComposer = require('../path-composer');

Voters = [{
    username : null,
        name : null,
}];

//Remove unimportant information of screen
function sanitizeInputScreenshot(inputScreenshotPath) {
    //Creation of output path
    var sanitizedScreenshotPath = PathComposer.getJoinedFileNamePath(inputScreenshotPath, '-output');
    //Crop image
    ImageCropper.crop(inputScreenshotPath, sanitizedScreenshotPath);
    //Return the output path of sanitized screenshot
    return sanitizedScreenshotPath;
};

//Remove Special Characteres
function getStringWithoutSpecialChars(str) {
    //return str.replace(/[`~!@#$%^&*()|+\-=?;:'",<>\{\}\[\]\\\/]/gi, '');
    return str.replace(/[^\w\s]/gi, '');
};

//Create a multiple line strings array from single string
function getLinesArrayFromString(str) {
    return str.split('\n');
};

function isEmpty(str) {
    return (!str || 0 === str.length);
};

function isBlank(str) {
    return (!str || /^\s*$/.test(str));
};

//Remove void lines
function getArrayWithNoVoidLines(textArray) {
    textArray.forEach(element => {
        if (isBlank(element) || isEmpty(element)){
            textArray.splice(textArray.indexOf(element), 1);
        }
    });
    return textArray;
}

//Remove Dead Text 
function getArrayWithNoDeadText(textArray) {
    textToRemove = 'respondeu ' + textArray[0];
    textToRemove = textToRemove.trim();

    let firstWordOfRmvString = textToRemove.split(' ')[0];
    let lastWordOfRmvString = textToRemove.split(' ')[(textToRemove.split(' ').length-1)];

    textArray.splice(0, 1);    
    
    for (var i = 0; i < textArray.length; i++) {
        textArray[i] = textArray[i].trim();
        if(textArray[i].search(firstWordOfRmvString) > -1) {
            textArray[i] = textArray[i].split(firstWordOfRmvString)[0];
            if((i+1 < textArray.length) && (textArray[i+1].search(lastWordOfRmvString) > -1)) {
                textArray.splice(i+1,1);
            }
        }
    }
    
    for (var i = 0; i <= textArray.length-1; i++) {
        textArray[i] = textArray[i].trim();
    }

    return textArray;
}

//Remove dead text from output text form OCR
function sanitizeOutputText(text) {
    var stringText = text.toString();
    stringText = getStringWithoutSpecialChars(stringText);

    var stringArray = getLinesArrayFromString(stringText);
    stringArray = getArrayWithNoVoidLines(stringArray);
    stringArray = getArrayWithNoDeadText(stringArray);
    return stringArray;
}

function createVotersArray(votersUsersAndNames) {
    Voters.shift();

    for(var i = 0; i <= votersUsersAndNames.length-1; i+=2) {
        Voters.push({
            username : votersUsersAndNames[i],
            name : votersUsersAndNames[i+1],
        });
    }
}

function printVoterOnConsoleLog() {
    console.log("Printing results... ");
    for(var i = 0; i <= Voters.length -1; i++) {
        console.log('@' + Voters[i].username + ' (' + Voters[i].name + ')');
    }
}

async function getVoters(inputScreenshotPath) {
    try {
        await ImageToText.convert(sanitizeInputScreenshot(inputScreenshotPath)).then(text => {
            createVotersArray(sanitizeOutputText(text));
        });
        return Voters
    } catch (error) {
        console.log("Error! " + error);
        throw error;
    }    
}

const buildVotersGetter = require('./test-results');

const GetVotersFromImage = buildVotersGetter(getVoters);

module.exports = GetVotersFromImage;