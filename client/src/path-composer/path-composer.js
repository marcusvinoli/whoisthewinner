function buildPathComposer() {
    return PathComposer = {
        getFileName(inPath) {
            var inputFileName = inPath.split(/(\\|\/)/g).pop();
            //console.log("Input file name: " + inputFileName);
            return inputFileName;
        },

        getFileExtension(inPath) {
            var inputFileName = this.getFileName(inPath);
            inputFileExtension = inputFileName.split('.').pop();
            //console.log("Input file format: " + inputFileExtension);
            return inputFileExtension;      
        },

        getFileNameWithoutExtension(inPath) {
            var inputFileName = this.getFileName(inPath);
            var inputFileExtension = this.getFileExtension(inPath);
            inputFileExtension = '.' + inputFileExtension;
            var inputFileNameWithoutExtension = inputFileName.split(inputFileExtension)[0];
            //console.log("Input file name w/o extension: " + inputFileNameWithoutExtension);
            return inputFileNameWithoutExtension;
        },

        getJoinedFileNamePath(inPath, joinStr) {
            var outputFileName = this.getFileNameWithoutExtension(inPath) + joinStr + '.' + this.getFileExtension(inPath);
            //console.log("Joined file name: " + outputFileName );
            var outputFilePath = inPath.split(this.getFileName(inPath))[0] + outputFileName;
            //console.log('Joined file path: ' + outputFilePath);
            return outputFilePath;
        },
    }
}

module.exports = buildPathComposer;