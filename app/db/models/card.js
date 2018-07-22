const mongoose = require('mongoose');

const CardSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
    trim: true
  },
  done: {
    type: Boolean,
    default: false,
    required: true,
  },
  author: { 
    type: Schema.Types.ObjectId,
    ref: 'User' 
  }
});

const Card = mongoose.model('Card', CardSchema);

module.exports = Card;