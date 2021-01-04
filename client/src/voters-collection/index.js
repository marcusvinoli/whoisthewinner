const buildVoterCollection = require('./voters-collection');

const User = require('../user');
const Options = require('../test-options');

const VoterCollection = buildVoterCollection(User);

const UsersVotersColletion = new VoterCollection();

module.exports = UsersVotersColletion;