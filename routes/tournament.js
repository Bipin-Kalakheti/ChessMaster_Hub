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



  router.get('/tournament-edit', async (req, res) => {
    console.log('tournament.js');
    try {
        const items = await Tournament.find();
        console.log(items);
        res.render('tournamentedit.ejs', { items, title: "Tournaments To Edit"}); // Render the EJS view and pass items as a local variable
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
  });



  //Authentication routes

// // GET Login Page
// router.get('/login', (req, res) => {
//     res.render('login.ejs', { title: 'Login' });
//   });

//   // POST Login Data
//   router.post('/login', async (req, res) => {


//   });

//   // GET Registration Page
//   router.get('/register', (req, res) => {
//     res.render('register.ejs', { title: 'Register' });
//   });

//   //Perform logout
//   router.get('/logout', (req, res) =>{

//   });






//CRUD

//  ADD - GET the Tournament Details page in order to add a new Tournament
router.get('/details', async (req, res, next) => {
    console.log('tournament.js');
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
        res.redirect('/tournament/tournament-edit');
    }
    catch(err)
    {
        console.log(err);
    }
});

//EDIT GET
router.get('/details/:id', async (req, res, next) => {
    let id = req.params.id;
    console.log('tournament.js');
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
        res.redirect('/tournament/tournament-edit');


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
        res.redirect('/tournament/tournament-edit');
    }
    catch(err)
    {
        console.log(err);
    }

});


module.exports = router;