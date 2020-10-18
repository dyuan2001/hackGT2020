const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const {ensureAuthenticated} = require("../config/auth.js");
const User = require('../models/user.js');



router.get('/inbox', ensureAuthenticated, (req,res) => {
    res.render('inbox', {
        user: req.user,
    });
});

router.post('/write', ensureAuthenticated, (req, res) => {
    console.log(req.body);
});

module.exports = router;
