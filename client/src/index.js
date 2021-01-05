const Option = require('./test-options');
//const UsersVotersColletion = require('./voters-collection');
const VotersList = require('./voters-list');
const VotesComputerClass = require('./votes-computer');

var UserVotersList = new VotersList();
var VotesComputer = new VotesComputerClass();

var Opcao01_V = new Option('Erva de Jaboti', '././tests/imgs/img01-ervadejaboti.jpg', true);
var Opcao01_F = new Option('Corações em Penca', '././tests/imgs/img02-coracoesempenca.jpg', false);
var Opcao02_V = new Option('Orelha de Shrek', '././tests/imgs/img03-orelhadeshrek.jpg', true);
var Opcao02_F = new Option('Orelha de Burro', '././tests/imgs/img04-orelhadeburro.jpg', false);
var Opcao03_F = new Option('Rosinha', '././tests/imgs/img05-rosinha.png', false);
var Opcao03_V = new Option('Onze-Horas', '././tests/imgs/img06-onzehoras.jpg', true);
var Opcao04_V = new Option('Beldroega', '././tests/imgs/img07-beldroega.jpg', true);
var Opcao04_F = new Option('Onze-Horas*', '././tests/imgs/img08-onzehorasE.jpg', false);
var Opcao05_F = new Option('Rosas do Deserto', '././tests/imgs/img09-rosasdodeserto.jpg', false);
var Opcao05_V = new Option('Rosas de Pedra', '././tests/imgs/img10-rosasdepedra.jpg', true);
var Opcao06_V = new Option('Avenca', '././tests/imgs/img11-avenca.jpg', true);
var Opcao06_F = new Option('Samambaia Saia-Baiana', '././tests/imgs/img12-samambaiasaiabahiana.jpg', false);
var Opcao07_V = new Option('Dinheiro-em-Penca', '././tests/imgs/img13-dinheiroempenca.jpg', true);
var Opcao07_F = new Option('Erva-Cabeleira', '././tests/imgs/img14-ervacabeleira.jpg', false);
var Opcao08_V = new Option('Samambaia Havaiana', '././tests/imgs/img15-samambaiahavaiana.jpg', true);
var Opcao08_F = new Option('Samambaia Paulista', '././tests/imgs/img16-samambaiapaulista.jpg', false);
var Opcao09_F = new Option('Espada de St. Bárbara', '././tests/imgs/img17-espadadestbarbara.png', false);
var Opcao09_V = new Option('Espada de São Jorge', '././tests/imgs/img18-espadadesaojorge.jpg', true);
var Opcao10_V = new Option('Babosa', '././tests/imgs/img19-babosa.jpg', true);
var Opcao10_F = new Option('Jaborandi', '././tests/imgs/img20-jaborandi.jpg', false);

var OptionsVector = [ 
    Opcao01_V,
    Opcao01_F,
    Opcao02_V,
    Opcao02_F,
    Opcao03_F,
    Opcao03_V,
    Opcao04_V,
    Opcao04_F,
    Opcao05_F,
    Opcao05_V,
    Opcao06_V,
    Opcao06_F,
    Opcao07_V,
    Opcao07_F,
    Opcao08_V,
    Opcao08_F,
    Opcao09_F,
    Opcao09_V,
    Opcao10_F,
    Opcao10_V,
];

function printResults(Opcao) {
    console.log('Option: ' + Opcao.optionText);
    console.log('Voters: ' + Opcao.numberOfVoters);
    console.log(Opcao.isCorrect);
    Opcao.voterList.forEach(voter => {
        console.log(voter);
    })
};

const promisesOptionsVector = [ 
    Opcao01_V.compute(),
    Opcao01_F.compute(),
    Opcao02_V.compute(),
    Opcao02_F.compute(),
    Opcao03_F.compute(),
    Opcao03_V.compute(),
    Opcao04_V.compute(),
    Opcao04_F.compute(),
    Opcao05_F.compute(),
    Opcao05_V.compute(),
    Opcao06_V.compute(),
    Opcao06_F.compute(),
    Opcao07_V.compute(),
    Opcao07_F.compute(),
    Opcao08_V.compute(),
    Opcao08_F.compute(),
    Opcao09_F.compute(),
    Opcao09_V.compute(),
    Opcao10_F.compute(),
    Opcao10_V.compute(),
];

Promise.all(promisesOptionsVector).then(function() {
    console.log("Resolved all Options");
}).then(function() {
    OptionsVector.forEach(OptionOnVector => {
        UserVotersList.addFromTestOption(OptionOnVector);
        console.log(OptionOnVector.numberOfVoters + " voters for " + OptionOnVector.optionText + ".");
    })
}).then(function() {
    OptionsVector.forEach(OptionOnVector => {
        VotesComputer.ComputeVotes(UserVotersList, OptionOnVector);
    })
}).then(function() {
    printUserData('marcusvinoli');
    printWinners();
});

function printUserData(username) {
    UserVotersList.voters.forEach(voter => {
        if(voter.username === username) {
            user = voter;
            console.log("= = = = = = = = = = = = = = = = =");
            console.log("Username: " + user.username);
            console.log("Name: " + user.name);
            console.log("Qnt. of Correct Answers: " + user.numberOfCorrectAnswers);
            console.log("Correct Answers: " + user.correctAnswers);
            console.log("Qnt. of Wrong Answers: " + user.numberOfWrongAnswers);
            console.log("Wrong Answers: " + user.wrongAnswers);
        }
    })
}

function printAccordingHits(hits) {
    UserVotersList.voters.forEach(voter => {
        if ((voter.numberOfCorrectAnswers === hits) && (voter.numberOfAnwers === OptionsVector.length)) {
            printUserData(voter.username);
        }
    })
}

function printWinners() {
    printAccordingHits(OptionsVector.length);
}