const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const PersonaSchema = new Schema ({
  name: {
    type: String,
    required: true,
    max: 40
  },
  avatar: {
    type: String
  },
  cRating: {
    type: Number
  },
  gRating: {
    type: Number
  },
  actions: [
    {
      action: {
        type: Schema.Types.ObjectId,
        ref: 'actions'
      }
    }
  ],
  social: {
    twitter: {
      type: String
    },
    instagram: {
      type: String
    },
    facebook: {
      type: String
    },
    email: {
      type: String
    },
    youtube: {
      type: String
    },
  }
});

module.exports = User = mongoose.model('personas', PersonaSchema);
