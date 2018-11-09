const mongoose = require('mongoose')

let UserSchema = new mongoose.Schema(
    {
        name: String,
        email: String,
        provider: String,
        providerId: String,
        token: String,
        providerPic: String,
        personas: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Persona'
            }
        ]
    }
)

UserSchema.methods.addPersona = function (personaId) {
    if (this.personas.indexOf(personaId) === -1) {
        this.personas.push(personaId)
    }
    return this.save()
}

module.exports = mongoose.model('User', UserSchema)
