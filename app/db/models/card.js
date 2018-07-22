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
});

const Card = mongoose.model('Card', CardSchema);

module.exports = Card;