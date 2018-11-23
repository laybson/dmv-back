const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const Profile = require('../../models/Profile');
const User = require('../../models/User');
const Persona = require('../../models/Persona');

// @route GET api/profile/test
// @desc Tests profile routes
// @access Public
router.get('/test', (req, res) => res.json({msg: "Profile Works"}));

// @route GET api/profile
// @desc GET current user profile
// @access Private
router.get('/', passport.authenticate('jwt', { session: false}), (req, res) => {
  const errors = {};

  Profile.findOne({ user: req.user.id })
    .populate('user', ['name', 'avatar']).then(profile => {
      if (!profile) {
        errors.noProfile = 'There is no profile for this user';
        return res.status(404).json(errors);
      }
      res.json(profile);
    }).catch(err => res.status(404).json(err));
});

// @route GET api/profile/all
// @desc GET all profiles
// @access Private
router.get('/all'/*, passport.authenticate('jwt', { session: false})*/, (reg, res) => {
  const errors = {};
  Profile.find()
    .populate('user', ['name', 'avatar']).then(profiles => {
      if (!profiles) {
        errors.noProfiles = 'There are no profiles'
        return res.status(404).json(errors);
      }
      res.json(profiles);
    }).catch(err => res.status(404).json({profiles: 'There are no profiles'}))
});



// @route GET api/profile/handle/:handle
// @desc GET profile by handle
// @access Private
router.get('/handle/:handle'/*, passport.authenticate('jwt', { session: false})*/, (req, res) => {
  const errors = {};

  Profile.findOne({ handle: req.params.handle })
    .populate('user', ['name', 'avatar']).then(profile => {
      if (!profile) {
        errors.noProfile = 'There is no profile for this handle';
        return res.status(404).json(errors);
      }
      res.json(profile);
    }).catch(err => res.status(404).json(err));
});

// @route GET api/profile/user/:user_id
// @desc GET profile by handle
// @access Private
router.get('/user/:user_id'/*, passport.authenticate('jwt', { session: false})*/, (req, res) => {
  const errors = {};

  Profile.findOne({ user: req.params.user_id })
    .populate('user', ['name', 'avatar']).then(profile => {
      if (!profile) {
        errors.noProfile = 'There is no profile for this user';
        return res.status(404).json(errors);
      }
      res.json(profile);
    }).catch(err => res.status(404).json({profile: "There is no profile for this user"}));
});


// @route POST api/profile
// @desc POST Create or Edit user profile
// @access Private
router.post('/', passport.authenticate('jwt', { session: false}), (req, res) => {
  const profileFields = {};
  profileFields.user = req.user.id;
  if (req.body.handle) profileFields.handle = req.body.handle;

  if(typeof req.body.personas !== 'undefined'){
    profileFields.personas = req.body.personas.split(',');
  }

  Profile.findOne({user: req.user.id}).then(profile => {
    if (profile) {
      Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true }
      ).then(profile => res.json(profile));
    } else {
      Profile.findOne({ handle: profileFields.handle }).then(profile => {
        if (profile) {
          errors.handle = 'That handle already exists';
          res.status(400).json(errors);
        }

        new Profile(profileFields).save().then(profile => res.json(profile));
      });
    }
  })
});

module.exports = router;
