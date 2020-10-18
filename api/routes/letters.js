const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const {ensureAuthenticated} = require("../config/auth.js");
const User = require('../models/user.js');



router.get('/write', ensureAuthenticated, (req,res) => {
    res.render('write', {
        user: req.user,
    });
});

router.post('/write', ensureAuthenticated, (req, res) => {
    console.log(req.body);
    
    
    

    res.render('write');
    //something something passport
    //quill getContents();
    //save to database
});

module.exports = router;