const mongoose = require('mongoose')

let PersonaSchema = new mongoose.Schema(
    {
        name: String,
        provider: String,
        providerId: String,
        providerPic: String,
        rating: Number,
        actions: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Action'
            }
        ]
    }
)

PersonaSchema.methods.rate = function (score) {
  this.rating = score
  return this.save()
}

PersonaSchema.methods.addAction = function (actionId) {
    if (this.actions.indexOf(actionId) === -1) {
        this.actions.push(actionId)
    }
    return this.save()
}

module.exports = mongoose.model('Persona', PersonaSchema)
