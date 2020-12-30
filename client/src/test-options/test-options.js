function buildOptionCreator(ResultsComputer) {
    return class Option {
        constructor(optionText, inputScreenshotPath, isCorrect) {
            this.optionText = optionText;
            this.inputScreenshotPath = inputScreenshotPath;
            this.isCorrect = isCorrect;
            this.voterList = [];
            this.isReady = false;
        };

        optionText;
        inputScreenshotPath;
        isCorrect;
        voterList;
        numberOfVoters;
        isReady;

        async compute(){
            await ResultsComputer(this.inputScreenshotPath)
            .then(list => {
                this.numberOfVoters = 0;
                this.isReady = false;
                list.forEach(element => {
                    this.voterList.push(element);
                    this.numberOfVoters++;
                });
            })
            .then(function(){
                //this.isReady = true;
            });
        }
    }
};

module.exports = buildOptionCreator;