const Option = require('./test-options');
const UsersVotersColletion = require('./voters-collection');

var Opcao01W = new Option('Espada de St. Bárbara', '././tests/imgs/img01.png', false);
var Opcao01C = new Option('Espada de São Jorge', '././tests/imgs/img03.jpg', true);
var Opcao02W = new Option('Erva-Cabeleira', '././tests/imgs/img02.png', false);

function printResults(Opcao) {
    console.log('Option: ' + Opcao.optionText);
    console.log('Voters: ' + Opcao.numberOfVoters);
    console.log(Opcao.isCorrect);
    Opcao.voterList.forEach(voter => {
        console.log(voter);
    })
}

const promisesVector = [ Opcao01W.compute(), Opcao01C.compute(), Opcao02W.compute() ];

Promise.all(promisesVector).then(function() {
    console.log("Resolved");
}).then(function() {
    UsersVotersColletion.add(Opcao01W);
}).then(function() {
    UsersVotersColletion.add(Opcao01C);
}).then(function() { 
    UsersVotersColletion.add(Opcao02W);
}).then(function() {
    printUserVotersCount('wesley_cm');
    printUserVotersCount('edvandomingossiqueira');
    printUserVotersCount('amandamohana');
    printUserVotersCount('brayannmarving');
    printUserVotersCount('marcusvinoli');
})

/*
Opcao01C.compute().then(function() {
    printResults(Opcao01C);
    UsersVotersColletion.add(Opcao01C);
    printUserVotersCount('wesley_cm');
})

Opcao01W.compute().then(function() {
    printResults(Opcao01W);
    UsersVotersColletion.add(Opcao01W);
})
*/

function printUserVotersCount(username) {

    UsersVotersColletion.votersCollection.forEach(voter => {
        if(voter.username === username) {
            user = voter;
            console.log("Username: " + user.username);
            console.log("Name: " + user.name);
            console.log("Qnt. of Correct Answers: " + user.numberOfCorrectAnswers);
            console.log("Correct Answers: " + user.correctAnswers);
            console.log("Qnt. of Wrong Answers: " + user.numberOfWrongAnswers);
            console.log("Wrong Answers: " + user.wrongAnswers);
        }
    })
}