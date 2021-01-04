const GetVotersFromImage = require('../test-results');
const buildOptionCreator = require('./test-options');

var Option = buildOptionCreator(GetVotersFromImage);

/*
const Option1 = new Option('Espada de St. Bárbara', '././tests/imgs/img01.png', false);


Option1.compute().then(function(){
    printResults();
});*/

module.exports = Option;