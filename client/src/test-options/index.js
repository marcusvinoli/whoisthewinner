const GetVotersFromImage = require('../test-results');
const buildOptionCreator = require('./test-options');

var Option = buildOptionCreator(GetVotersFromImage);

const Option1 = new Option('Espada de St. Bárbara', '././tests/img01.png', false);

function printResults(){
    Option1.voterList.forEach(voter => {
        console.log(voter);
    })
};

Option1.compute().then(function(){
    printResults();
});

module.exports = Option;