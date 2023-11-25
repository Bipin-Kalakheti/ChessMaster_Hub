let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

//Connecting to the database model tournament
let Tournament = require('../models/tournament');


router.get('/tournament', async (req, res) => {
    console.log('tournament.js');
    
        const items = await Tournament.find();
        console.log(items);
        res.render('tournament.ejs', { items, title: "Tournaments"}); // Render the EJS view and pass items as a local variable
    
  });




//  ADD - GET the Tournament Details page in order to add a new Tournament
router.get('/details', async (req, res, next) => {
    console.log('tourney.js');
    try {
        const items = await Tournament.find();
        res.render('details.ejs', {items, title: "Add Tournament"}); // Render the EJS view and pass items as a local variable
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }

});

//ADD POST
router.post('/details', async (req, res, next) => {
    try 
    {
        await Tournament.create(

            {
            "title": req.body.title,
            "type": req.body.type,
            "location": req.body.location,
            "date": req.body.date
        });
        res.redirect('/tournament/tournament');
    }
    catch(err)
    {
        console.log(err);
    }
});

//EDIT GET
router.get('/details/:id', async (req, res, next) => {
    let id = req.params.id;
    console.log('tourney.js');
    try { 
            const items = await Tournament.findByIdAndUpdate(
                id,
                {
                    "title": req.body.title,
                    "type": req.body.type,
                    "location": req.body.location,
                    "date": req.body.date
            });
            res.render('../views/details', {title: 'Edit Contact', items: items});


    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }

});

//EDIT POST
router.post('/details/:id', async (req, res, next) => {
    let id = req.params.id;
    try { 
        const items = await Tournament.findByIdAndUpdate(
            id,
            {
                "title": req.body.title,
                "type": req.body.type,
                "location": req.body.location,
                "date": req.body.date
        });
        res.redirect('/tournament/tournament');


} catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
}

});


//DELETE
router.get('/delete/:id', async (req, res, next) => {
    let id = req.params.id;
    //const items = await Contact.find();
    console.log(await Tournament.findById(id));

    try 
    {
        await Tournament.findByIdAndDelete(id)
        res.redirect('/tournament/tournament');
    }
    catch(err)
    {
        console.log(err);
    }

});

module.exports = router;