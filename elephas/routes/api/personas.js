const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const validatePersonaInput = require('../../validation/persona');

const Profile = require('../../models/Profile');
const User = require('../../models/User');
const Action = require('../../models/Action');
const Persona = require('../../models/Persona');

// @route GET api/personas/test
// @desc Tests personas routes
// @access Public
router.get('/test', (req, res) => res.json({msg: "Personas Works"}));


// @route GET api/personas/name/:name
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

// @route GET api/personas/:id
// @desc GET persona by name
// @access Private
router.get('/:id'/*, passport.authenticate('jwt', { session: false})*/, (req, res) => {
  const errors = {};
  Persona.findById(req.params.id).then(persona => {
      if (!persona) {
        errors.noPersona = 'There is no persona for this id';
        return res.status(404).json(errors);
      }
      res.json(persona);
    }).catch(err => res.status(404).json(err));
});

// @route GET api/personas/all
// @desc GET all personas
// @access Private
router.get('/all'/*, passport.authenticate('jwt', { session: false})*/, (req, res) => {
  const errors = {};
  Persona.find().then(personas => {
      if (!personas) {
        errors.noPersonas = 'There are no personas'
        return res.status(404).json(errors);
      }
      res.json(personas);
    }).catch(err => res.status(404).json({personas: 'There are no personas'}))
});

// @route GET api/personas/all/:id
// @desc GET all user's personas
// @access Private
router.get('/all/:id', passport.authenticate('jwt', { session: false}), (req, res) => {
  const errors = {};
  Persona.find({ user: req.params.id }).then(personas => {
      if (!personas) {
        errors.noPersonas = 'There are no personas'
        return res.status(404).json(errors);
      }
      res.json(personas);
    }).catch(err => res.status(404).json({personas: 'There are no personas'}))
});

// @route POST api/personas/ratings/:id
// @desc POST Edit personas ratings
// @access Private
router.post('/ratings/:id', passport.authenticate('jwt', { session: false}), (req, res) => {
  // const { errors, isValid } = validatePersonaInput(req.body);
  // if (!isValid) {
  //   return res.status(400).json(errors);
  // }
  const errors = {};
  let personaData = {};
  personaData.user = req.user.id;
  console.log("AAAA0", req.params.id)
  Action.find({ persona: req.params.id }).then(actions => {
    console.log("AAAA1", actions)
    let cRating = 0;
    let gRating = 0;
    for (const action of actions) {
      cRating += Number(action.cRating);
      gRating += Number(action.gRating);
    }
    personaData.cRating = String(cRating);
    personaData.gRating = String(gRating);
  }).then(() => {

    Persona.findById(req.params.id).then(persona => {
      console.log("AAAA2", persona, personaData)
      if (persona) {
        Persona.findOneAndUpdate(
          { _id: req.params.id },
          { $set: personaData },
          { new: true }
        ).then(persona => res.json(persona));
      } else {
        errors.noPersonas = 'There are no personas'
        return res.status(404).json(errors);
      }
    })
  })
});

// @route POST api/personas/:id
// @desc POST Edit persona
// @access Private
router.post('/:id', passport.authenticate('jwt', { session: false}), (req, res) => {
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

  Persona.findById(req.params.id).then(persona => {
    if (persona) {
      Persona.findOneAndUpdate(
        { user: req.user.id },
        { $set: personaFields },
        { new: true }
      ).then(persona => res.json(persona));
    } else {
      errors.noPersonas = 'There are no personas'
      return res.status(404).json(errors);
    }
  })
});

// @route POST api/personas
// @desc POST Create persona
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
    // if (persona) {
    //   Persona.findOneAndUpdate(
    //     { user: req.user.id },
    //     { $set: personaFields },
    //     { new: true }
    //   ).then(persona => res.json(persona));
    // } else {
      Persona.findOne({ user: req.user.id, name: personaFields.name }).then(persona => {
        if (persona) {
          errors.name = 'That name already exists';
          return res.status(400).json(errors);
        }

        new Persona(personaFields).save().then(persona => res.json(persona));
      });
    // }
  })
});

// @route   DELETE api/personas
// @desc    Delete persona
// @access  Private
router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Persona.findOneAndRemove({ _id: req.params.id }).then(() => {
      res.json({ success: true })
    });
  }
);

module.exports = router;
