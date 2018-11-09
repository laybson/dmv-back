const mongoose = require('mongoose')

let ActionSchema = new mongoose.Schema (
  {
    title: String,
    description: String,
    featureImg: String,
    rating: Number,
    actor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Persona'
    },
    comments: [
      {
        author: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User'
        },
        text: String
      }
    ]
  }
);

ActionSchema.methods.rate = function (score) {
  this.rating = score
  return this.save()
}

ActionSchema.methods.comment = function (commentary) {
  this.comments.push(commentary)
  return this.save()
}

ActionSchema.methods.addActor = function (actorId) {
  this.actor = actorId
  return this.save()
}

ActionSchema.methods.getActorAction = function (id) {
  Action.find({'actor': id}).then((action) => {
    return action
  })
}

module.exports = mongoose.model('Action', ActionSchema)
