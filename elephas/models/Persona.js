const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const PersonaSchema = new Schema ({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  name: {
    type: String,
    required: true,
    max: 40
  },
  avatar: {
    type: String
  },
  cRating: {
    type: Number,
    defaut: 0
  },
  gRating: {
    type: Number,
    defaut: 0
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
