const Action = require('./Action')
const Persona = require('./../persona/Persona')
const fs = require('fs')
const cloudinary = require('cloudinary')

module.exports = {
  addAction: (req, res, next) => {
    let { title, description, rating } = req.body
    if (req.files.image) {
      cloudinary.uploader.upload(req.files.image.path,
      (result) => {
        let obj = { title, description, rating,
        featureImg: result.url != null ? result.url : '' }
        saveAction(obj)
      },{
        resource_type: 'image',
        eager: [
          {effect: 'sepia'}
        ]
      })
    } else {
      saveAction({ title, description, rating, featureImg: ''})
    }
    function saveAction (obj) {
      new Action(obj).save((err, action) => {
        if (err)
          res.send(err)
        else if (!action)
          res.send(400)
        else {
          return action.addAuthor(req.body.actorId).then((action) => {
            return res.send(action)
          })
        }
        next ()
      })
    }
  },

  getAll: (req, res, next) => {
    Action.find(req.params.id)
      .populate('actor').exec((err, action) => {
        if (err)
          res.send(err)
        else if (!action)
          res.send(404)
        else
          res.send(action)
        next ()
      })
  },

  rateAction: (req, res, next) => {
    Action.findById(req.body.actionId).then((action) => {
      return action.rate(req.body.score).then(() => {
        return res.json({msg: "Rated"})
      })
    }).catch(next)
  },

  commentAction: (req, res, next) => {
    Action.findById(req.body.actionId).then((action) => {
      return action.comment({
        author: req.body.authorId,
        text: req.body.comment
      }).then(() => {
        return res.json({msg: "Done"})
      })
    }).catch(next)
  },

  getAction: (req, res, next) => {
    Action.findById(req.params.id)
      .populate('actor')
      .populate('comments.author').exec((err, action) => {
        if (err)
          res.send(err)
        else if (!action)
          res.send(404)
        else
          res.send(action)
        next ()
      })
  }
}
