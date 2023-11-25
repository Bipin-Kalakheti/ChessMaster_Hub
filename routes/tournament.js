let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

//Connecting to the database model tournament
let Tournament = require('../models/tornament');


router.get('/tournaments', async (req, res) => {
    console.log('tournament.js');
    try {
        const items = await tournament.find();
        console.log(items);
        res.render('tournament.ejs', { items, title: "Tournaments"}); // Render the EJS view and pass items as a local variable
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
  });


module.exports = router;