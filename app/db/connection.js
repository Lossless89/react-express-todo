const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/new_todo', { useNewUrlParser: true });

module.exports = mongoose;