let mongoose = require('mongoose');

//create a model
let tournamentmodel = mongoose.Schema({
    title: String,
    type: String,
    location: String,
    date: String
},
{
    collection: "tournament"
});

module.exports = mongoose.model('tournament', tournamentmodel);