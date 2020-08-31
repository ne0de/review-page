var express = require('express');
var router = express.Router();
const controller = require("../controllers/user.controllers");
const passport = require('passport');

router.get('/register', controller.showRegister);

router.post('/', passport.authenticate('register', 
    {
        successRedirect: 'user/profile',
        failureRedirect: 'user/register',
        failureFlash: true,
        passReqToCallback: true
    }
));

router.get('/login', controller.showLogin);

router.post('/login', passport.authenticate('login', 
    {
        successRedirect: 'profile',
        failureRedirect: 'login',
        passReqToCallback: true
    }
));

router.get('/profile/:id', controller.verifyProfile, controller.showProfileById);

router.get('/profile', controller.isAuthenticated, controller.showProfile);

router.get('/edit', controller.isAuthenticated, controller.showEditProfile);

router.put('/edit', controller.isAuthenticated, controller.editProfile);

router.get('/salir', (req, res) => {
    req.logout();
    res.redirect('/');
});

module.exports = router;
