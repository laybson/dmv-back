const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const Action = require('../../models/Action');
const Profile = require('../../models/Profile');
const Persona = require('../../models/Persona');

const validateActionInput = require('../../validation/action');

// @route GET api/actions/test
// @desc Tests actions routes
// @access Public
router.get('/test', (req, res) => res.json({msg: "Actions Works"}));

// @route GET api/actions
// @desc GET actions
// @access Public
router.get('/'/*, passport.authenticate('jwt', { session: false})*/, (req, res) => {
  const errors = {};

  Action.find().sort({date: -1}).then(actions => res.json(actions))
    .catch(err => res.status(404).json({noActionFound: 'No action found'}));
});

// @route GET api/actions/persona/:persona_id
// @desc GET actions by persona
// @access Private
router.get('/persona/:persona_id'/*, passport.authenticate('jwt', { session: false})*/, (req, res) => {
  const errors = {};

  Action.find({ persona: req.params.persona_id }).then(actions => {
      if (!actions) {
        errors.noProfile = 'There is no actions for this persona';
        return res.status(404).json(errors);
      }
      res.json(actions);
    }).catch(err => res.status(404).json({actions: "There is no actions for this persona"}));
});

// @route GET api/actions/user/:user_id
// @desc GET actions by user
// @access Private
router.get('/user/:user_id'/*, passport.authenticate('jwt', { session: false})*/, (req, res) => {
  const errors = {};

  Profile.find({ user: req.params.user_id }).then(actions => {
      if (!actions) {
        errors.noProfile = 'There is no actions for this user';
        return res.status(404).json(errors);
      }
      res.json(actions);
    }).catch(err => res.status(404).json({actions: "There is no actions for this user"}));
});

// @route GET api/actions/:id
// @desc GET actions by id
// @access Public
router.get('/:id'/*, passport.authenticate('jwt', { session: false})*/, (req, res) => {
  const errors = {};

  Action.findById(req.params.id).then(action => res.json(action))
    .catch(err => res.status(404).json({noActionFound: 'No action found with this Id'}));
});

// @route POST api/actions
// @desc Create Action
// @access Private
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { errors, isValid } = validateActionInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const newAction = new Action({
    text: req.body.text,
    user: req.user.id,
    persona: req.body.persona,
    cRating: req.body.cRating,
    gRating: req.body.gRating,
  });

  newAction.save().then(action => {
    // calculateRatings(req.body.persona);
    res.json(action)});
});

// @route DELETE api/actions/:id
// @desc Delete Action
// @access Private
router.delete('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  console.log("REQ",req.body)
  Profile.findOne({ user: req.user.id }).then(profile => {
    Action.findById(req.params.id).then(action => {
      if (action.user.toString() !== req.user.id) {
        return res.status(401).json({ noAthorized: 'User not authorized' });
      }
      action.remove().then(() => {
        // calculateRatings(req, res);
        res.json({ success: true })})
    }).catch(err => res.status(404).json({ actionNotFound: 'No action found with this Id' }));
  });
});


// @route POST api/actions/comment/:id
// @desc Add comment to Action
// @access Private
router.post('/comment/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { errors, isValid } = validateActionInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }

  Action.findById(req.params.id).then(action => {
    const newComment = {
      text: req.body.text
    }
    action.comments.unshift(newComment);
    action.save().then(action => {
      res.json(action)})
  }).catch(err => res.status(404).json({ actionNotFound: 'No action found' }));
});


// @route DELETE api/actions/comment/:id/:comment_id
// @desc Delete comment to Action
// @access Private
router.delete('/comment/:id/:comment_id', passport.authenticate('jwt', { session: false }), (req, res) => {
  Action.findById(req.params.id).then(action => {
    if (action.comments.filter(comment => comment._id.toString() === req.params.comment_id).length === 0) {
      return res.status(404).json({ commentNotFound: 'Comment not found' });
    }

    const removeIndex = action.comments.map(item => item._id.toString()).indexOf(req.params.comment_id);
    action.comments.splice(removeIndex, 1);
    action.save().then(action => res.json(action));
  }).catch(err => res.status(404).json({ actionNotFound: 'No action found' }));
});

// calculateRatings = (id) => {
//   Action.find({ persona: id }).then(actions => {
//     let personaData = {}
//     let cRating = 0;
//     let gRating = 0;
//     for (const action of actions) {
//       cRating += Number(action.cRating);
//       gRating += Number(action.gRating);
//     }
//     personaData.cRating = String(cRating);
//     personaData.gRating = String(gRating);
//   })
// }


module.exports = router;
