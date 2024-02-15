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
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/],
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

// Create a virtual called friendCount that retrieves the length of the user's friends array field on query.
userSchema.virtual('friendCount').get(function () {
  return this.friends.length;
});

const User = model('User', userSchema);

module.exports = User;