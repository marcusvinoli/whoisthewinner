function buildOptionCreator(ResultsComputer) {
    return class Option {
        constructor(optionText, inputScreenshotPath, isCorrect) {
            this.optionText = optionText;
            this.inputScreenshotPath = inputScreenshotPath;
            this.isCorrect = isCorrect;
            this.voterList = [];
            this.isReady = false;
            this.numberOfVoters = 0;
        };

        async compute(){
            let Results = new ResultsComputer();
            console.log('Results for: ' + this.optionText);
            await Results.getVoters(this.inputScreenshotPath)
            .then(list => {
                list.forEach(element => {
                    this.voterList.push(element);
                });
                this.numberOfVoters = list.length;
            })
        }
    }
};

module.exports = buildOptionCreator;