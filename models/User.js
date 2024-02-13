const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');
const thoughtsSchema = require('./Thoughts');

// schema to create user
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      max_length: 18,
    },
    thoughts: [thoughtsSchema],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

const User = model('User', userSchema);

module.exports = User;