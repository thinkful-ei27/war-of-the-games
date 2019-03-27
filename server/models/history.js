'use strict';

const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  gameOne: { type: mongoose.Schema.Types.ObjectId, ref: 'Game', required:true },
  gameTwo: { type: mongoose.Schema.Types.ObjectId, ref: 'Game', required:true },
  choice: { type: mongoose.Schema.Types.ObjectId, ref: 'Game', required:true },
  // userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required:true}
});

// Add `createdAt` and `updatedAt` fields
schema.set('timestamps', true);

// Transform output during `res.json(data)`, `console.log(data)` etc.
schema.set('toJSON', {
  virtuals: true,
  transform: (doc, result) => {
    delete result._id;
    delete result.__v;
  }
});

module.exports = mongoose.model('History', schema);
