const mongoose = require('mongoose');
const Schema = mongoose.Schema;

console.log('Schema',Schema.Types);
const CardSchema = new Schema({
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
