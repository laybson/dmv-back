const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const validatePersonaInput = require('../../validation/persona');

const Profile = require('../../models/Profile');
const User = require('../../models/User');
const Persona = require('../../models/Persona');

// @route GET api/personas/test
// @desc Tests personas routes
// @access Public
router.get('/test', (req, res) => res.json({msg: "Personas Works"}));


// @route GET api/persona/name/:name
// @desc GET persona by name
// @access Private
router.get('/name/:name'/*, passport.authenticate('jwt', { session: false})*/, (req, res) => {
  const errors = {};

  Persona.findOne({ name: req.params.name }).then(persona => {
      if (!persona) {
        errors.noPersona = 'There is no persona for this name';
        return res.status(404).json(errors);
      }
      res.json(persona);
    }).catch(err => res.status(404).json(err));
});

// @route GET api/persona/all
// @desc GET all personas
// @access Private
router.get('/all'/*, passport.authenticate('jwt', { session: false})*/, (reg, res) => {
  const errors = {};
  Persona.find().then(personas => {
      if (!personas) {
        errors.noPersonas = 'There are no personas'
        return res.status(404).json(errors);
      }
      res.json(personas);
    }).catch(err => res.status(404).json({personas: 'There are no personas'}))
});


// @route POST api/personas
// @desc POST Create or Edit persona
// @access Private
router.post('/', passport.authenticate('jwt', { session: false}), (req, res) => {
  const { errors, isValid } = validatePersonaInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const personaFields = {};
  personaFields.user = req.user.id;
  if (req.body.name) personaFields.name = req.body.name;
  if (req.body.avatar) personaFields.avatar = req.body.avatar;
  if (req.body.cRating) personaFields.cRating = req.body.cRating;
  if (req.body.gRating) personaFields.gRating = req.body.gRating;
  if(typeof req.body.actions !== 'undefined'){
    personaFields.actions = req.body.actions.split(',');
  }
  personaFields.social = {};
  if (req.body.twitter) personaFields.social.twitter = req.body.twitter;
  if (req.body.instagram) personaFields.social.instagram = req.body.instagram;
  if (req.body.facebook) personaFields.social.facebook = req.body.facebook;
  if (req.body.email) personaFields.social.email = req.body.email;
  if (req.body.youtube) personaFields.social.youtube = req.body.youtube;

  Persona.findOne({user: req.user.id}).then(persona => {
    if (persona) {
      Persona.findOneAndUpdate(
        { user: req.user.id },
        { $set: personaFields },
        { new: true }
      ).then(persona => res.json(persona));
    } else {
      Persona.findOne({ name: personaFields.name }).then(persona => {
        if (persona) {
          errors.name = 'That name already exists';
          res.status(400).json(errors);
        }

        new Persona(personaFields).save().then(persona => res.json(persona));
      });
    }
  })
});

module.exports = router;
