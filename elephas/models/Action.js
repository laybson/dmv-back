const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ActionSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  persona: {
    type: Schema.Types.ObjectId,
    ref: 'personas'
  },
  text: {
    type: String,
    required: true
  },
  cRating: {
    type: Number,
    required: true
  },
  gRating: {
    type: Number,
    required: true
  },
  comments: [
    {
      text: {
        type: String,
        required: true
      },
      date: {
        type: Date,
        defaut: Date.now
      }
    }
  ],
  date: {
    type: Date,
    defaut: Date.now
  }
});

module.exports = Action = mongoose.model('action', ActionSchema);
