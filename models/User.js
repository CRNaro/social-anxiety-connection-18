const { Schema, model, default: mongoose } = require('mongoose');
//const AutoIncrementFactory = require('mongoose-sequence')(mongoose);
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
      getters: true,
    },
    id: false,
  }
);

// Create a virtual called friendCount that retrieves the length of the user's friends array field on query.
userSchema.virtual('friendCount').get(function () {
  return this.friends.length;
});

//userSchema.plugin(AutoIncrementFactory, { id: 'userId_counter', inc_field: 'userId' });

const User = model('User', userSchema);

module.exports = User;